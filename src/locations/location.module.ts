import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { Location } from './location.entity';
import { LocationLog } from '../location-logs/location-log.entity';
import { Area } from '../areas/area.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationQueueProcessor } from './processors/location-queue.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Area, LocationLog]),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    BullModule.registerQueue({
      name: 'location',
    }),
  ],
  providers: [LocationService, LocationQueueProcessor],
  controllers: [LocationController],
})
export class LocationModule {}
