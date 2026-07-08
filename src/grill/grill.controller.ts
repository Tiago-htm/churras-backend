import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GrillService } from './grill.service';
import { CreateGrillDto } from './dto/create-grill.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthPayload } from 'src/auth/interfaces/auth-payload';
import { UpdateGrillDto } from 'src/grill/dto/update-grill.dto';
@ApiTags('Grill')
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

function Path(): (target: GrillController, propertyKey: "findAll", descriptor: TypedPropertyDescriptor<() => Promise<{ uuid: string; name: string; date: Date; time: string; adults: number; kids: number; isVegan: boolean; city: string; userUuid: string; }[]>>) => void | TypedPropertyDescriptor<...> {
  throw new Error('Function not implemented.');
}
