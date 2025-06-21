import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  polygon: number[][][]; // GeoJSON coordinates [[[[lon, lat], [lon, lat], [lon, lat], [lon, lat], [lon, lat]]]]
}
