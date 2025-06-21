import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationLog } from '../logs/log.entity';
import { Area } from '../areas/area.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Area, LocationLog])],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
