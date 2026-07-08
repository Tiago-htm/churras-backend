import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GrillService } from './grill.service';
import { CreateGrillDto } from './dto/create-grill.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthPayload } from 'src/auth/interfaces/auth-payload';
import { UpdateGrillDto } from 'src/grill/dto/update-grill.dto';


@ApiTags('Grill')
@ApiBearerAuth()
@Controller('grill')
export class GrillController {
  constructor(private readonly grillService: GrillService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um churrasco e gera o comprovante automaticamente' })
  create(@Body() dto: CreateGrillDto, @CurrentUser() user: AuthPayload) {
    return this.grillService.create(dto, user.uuid);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Atualiza um churrasco e regenera o comprovante' })
  update(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateGrillDto,
    @CurrentUser() user: AuthPayload,
  ) {
    return this.grillService.update(uuid, dto, user.uuid);
  }

  @Get()
  @ApiOperation({ summary: 'Lista os churrascos do usuário logado' })
  findAll(@CurrentUser() user: AuthPayload) {
    return this.grillService.findAll(user.uuid);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Busca um churrasco pelo uuid' })
  findByUuid(@Param('uuid') uuid: string, @CurrentUser() user: AuthPayload) {
    return this.grillService.findByUuid(uuid);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Deleta um churrasco' })
  remove(@Param('uuid') uuid: string, @CurrentUser() user: AuthPayload) {
    return this.grillService.remove(uuid);
  }
}