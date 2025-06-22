import { Process, Processor } from '@nestjs/bull';
import { Job, DoneCallback } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { point, polygon } from '@turf/turf';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { Location } from '../location.entity';
import { Area } from '../../areas/area.entity';
import { LocationLog } from '../../location-logs/location-log.entity';
import { CreateLocationDto } from '../dto/create-location.dto';

@Processor('location')
export class LocationQueueProcessor {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    @InjectRepository(LocationLog)
    private locationLogRepository: Repository<LocationLog>,
    @InjectQueue('location')
    private locationQueue: Queue,
  ) {}

  @Process('prepare')
  async handlePrepare(job: Job<CreateLocationDto>, done: DoneCallback) {
    const { user_id, latitude, longitude } = job.data;

    const location = this.locationRepository.create({
      user_id,
      coordinates: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    const savedLocation = await this.locationRepository.save(location);

    const areas = await this.areaRepository.find();
    const turfPoint = point([longitude, latitude]);

    for (const area of areas) {
      const rawPolygon = area.polygon as { coordinates: number[][][] };
      const turfPolygon = polygon(rawPolygon.coordinates);
      const isInside = booleanPointInPolygon(turfPoint, turfPolygon);

      if (isInside) {
        await this.locationQueue.add('process', {
          user_id,
          area_id: area.id,
          location_id: savedLocation.id,
        });
        break;
      }
    }

    done();
  }

  @Process('process')
  async handleProcess(
    job: Job<{ user_id: string; area_id: string; location_id: string }>,
    done: DoneCallback,
  ) {
    const { user_id, area_id, location_id } = job.data;

    const log = this.locationLogRepository.create({
      user_id,
      area_id,
      location: { id: location_id } as Location,
    });

    await this.locationLogRepository.save(log);
    done();
  }
}
