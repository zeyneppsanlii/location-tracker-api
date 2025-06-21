import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  polygon: number[][][]; // GeoJSON coordinates [[[[lon, lat], [lon, lat], [lon, lat], [lon, lat], [lon, lat]]]]
}
