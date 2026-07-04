import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GrillService } from './grill.service';
import { CreateGrillDto } from './dto/create-grill.dto';

@ApiTags('Grill')
@Controller('grill')
export class GrillController {
  constructor(private readonly grillService: GrillService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um churrasco e gera o comprovante automaticamente' })
  create(@Body() dto: CreateGrillDto) {
    return this.grillService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os churrascos' })
  findAll() {
    return this.grillService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Busca um churrasco pelo uuid' })
  findByUuid(@Param('uuid') uuid: string) {
    return this.grillService.findByUuid(uuid);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Deleta um churrasco' })
  remove(@Param('uuid') uuid: string) {
    return this.grillService.remove(uuid);
  }
}