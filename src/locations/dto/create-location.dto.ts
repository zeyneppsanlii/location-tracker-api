import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
