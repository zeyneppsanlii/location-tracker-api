import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: [
      [
        [32.7502, 39.8946],
        [32.751, 39.8946],
        [32.751, 39.8955],
        [32.7502, 39.8955],
        [32.7502, 39.8946],
      ],
    ],
  })
  @IsArray()
  @IsNotEmpty()
  polygon: number[][][];
}
