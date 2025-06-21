import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationLog } from './log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LocationLog)
    private logRepository: Repository<LocationLog>,
  ) {}

  async findAll(): Promise<LocationLog[]> {
    return this.logRepository.find({
      relations: ['area'],
      order: { entered_at: 'DESC' },
    });
  }
}
