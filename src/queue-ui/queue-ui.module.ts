import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueUiService } from './queue-ui.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'location',
    }),
  ],
  providers: [QueueUiService],
})
export class QueueUiModule {}
