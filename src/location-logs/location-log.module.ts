import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LocationLog } from './log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationLog])],
  controllers: [LogController],
  providers: [LogService],
  exports: [TypeOrmModule],
})
export class LogModule {}
