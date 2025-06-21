import { Controller, Get } from '@nestjs/common';
import { LogService } from './log.service';
import { LocationLog } from './log.entity';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getAllLogs(): Promise<LocationLog[]> {
    return this.logService.findAll();
  }
}
