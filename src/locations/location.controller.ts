import { Controller, Post, Body } from '@nestjs/common';

import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() dto: CreateLocationDto): Promise<{ message: string }> {
    await this.locationService.enqueueLocationJob(dto);
    return { message: 'Konum işleme kuyruğuna eklendi.' };
  }
}
