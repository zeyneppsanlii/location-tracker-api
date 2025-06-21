import { Controller, Post, Get, Body } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { Area } from './area.entity';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  async create(@Body() createAreaDto: CreateAreaDto): Promise<Area> {
    return this.areaService.create(createAreaDto);
  }

  @Get()
  async findAll(): Promise<Area[]> {
    return this.areaService.findAll();
  }
}
