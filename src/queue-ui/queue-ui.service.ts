import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import * as express from 'express';

@Injectable()
export class QueueUiService implements OnModuleInit {
  constructor(@InjectQueue('location') private locationQueue: Queue) {}

  onModuleInit() {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: [new BullAdapter(this.locationQueue)],
      serverAdapter,
    });

    const app = express();
    app.use('/admin/queues', serverAdapter.getRouter());

    app.listen(3001, () => {
      console.log(
        '✅ Queue UI is running at http://localhost:3001/admin/queues',
      );
    });
  }
}
