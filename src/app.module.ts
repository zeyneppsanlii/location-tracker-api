import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaModule } from './areas/area.module';
import { LocationModule } from './locations/location.module';
import { LocationLogModule } from './location-logs/location-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['src/migrations/*.ts'],
    }),
    AreaModule,
    LocationModule,
    LocationLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
