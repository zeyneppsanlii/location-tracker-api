import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { Area } from '../areas/area.entity';
import { LocationLog } from '../logs/log.entity';
import { point, polygon } from '@turf/turf';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Area)
    private areaRepository: Repository<Area>,

    @InjectRepository(LocationLog)
    private locationLogRepository: Repository<LocationLog>,
  ) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    const { user_id, latitude, longitude } = dto;

    // 1. Location kaydını oluştur
    const location = this.locationRepository.create({
      user_id,
      coordinates: {
        type: 'Point',
        coordinates: [longitude, latitude], // GeoJSON formatı
      },
    });

    const savedLocation = await this.locationRepository.save(location);

    // 2. Tüm alanları çek
    const areas = await this.areaRepository.find();

    // 3. Bu nokta herhangi bir alanın içinde mi?
    const turfPoint = point([longitude, latitude]);

    for (const area of areas) {
      const rawPolygon = area.polygon as { coordinates: number[][][] };
      const turfPolygon = polygon(rawPolygon.coordinates);
      const isInside = booleanPointInPolygon(turfPoint, turfPolygon);

      if (isInside) {
        // 4. İçindeyse log kaydı oluştur
        const log: LocationLog = this.locationLogRepository.create({
          user_id,
          area_id: area.id,
        });

        await this.locationLogRepository.save(log);
        break; // bir alana girdiyse diğerlerini kontrol etme
      }
    }

    return savedLocation;
  }
}
