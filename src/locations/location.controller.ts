import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() dto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(dto);
  }
}
