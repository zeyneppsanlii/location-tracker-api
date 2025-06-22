import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(@InjectQueue('location') private readonly locationQueue: Queue) {}

  async enqueueLocationJob(dto: CreateLocationDto) {
    await this.locationQueue.add('prepare', dto);
  }
}
