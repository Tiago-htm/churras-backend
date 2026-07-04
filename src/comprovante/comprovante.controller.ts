import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ComprovanteService } from './comprovante.service';

@ApiTags('Comprovante')
@Controller('comprovante')
export class ComprovanteController {
  constructor(private readonly comprovanteService: ComprovanteService) {}

  @Get(':uuid')
  @ApiOperation({ summary: 'Busca o comprovante (churrasco + clima) pelo uuid' })
  findByUuid(@Param('uuid') uuid: string) {
    return this.comprovanteService.findByUuid(uuid);
  }
}