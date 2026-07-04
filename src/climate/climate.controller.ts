import { Body, Controller, Post } from '@nestjs/common';
import { ClimateService } from './climate.service';
import { CreateClimateDto } from 'src/climate/dto/create-clima.dto';

@Controller('climate')
export class ClimateController {
  constructor(private readonly climateService: ClimateService) {}

  @Post()
  create(@Body() dto: CreateClimateDto) {
    return this.climateService.createFromForecast(dto);
  }
}