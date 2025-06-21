import { Controller, Get } from '@nestjs/common';
import { LocationLogService } from './location-log.service';
import { LocationLog } from './location-log.entity';

@Controller('logs')
export class LocationLogController {
  constructor(private readonly logService: LocationLogService) {}

  @Get()
  async getAllLogs(): Promise<LocationLog[]> {
    return this.logService.findAll();
  }
}
