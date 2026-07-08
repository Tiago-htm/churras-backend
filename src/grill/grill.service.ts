import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ComprovanteService } from '../comprovante/comprovante.service';
import { CreateGrillDto } from './dto/create-grill.dto';
import { Prisma } from '../../generated/prisma/client';
import {
  calcularPessoas,
  calcularCarne,
  calcularBebida,
  calcularCarvao,
  calcularGelo,
} from './calc.util';

@Injectable()
export class GrillService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly comprovanteService: ComprovanteService,
  ) {}

  async create(dto: CreateGrillDto, userUuid: string) {
    const pessoas = calcularPessoas(dto.adult, dto.kids);

    const grill = await this.prisma.grill.create({
      data: {
        name: dto.name,
        date: new Date(dto.date),
        duration: 1,
        adult: dto.adult,
        kids: dto.kids,
        isVegan: dto.isVegan,
        city: dto.city,
        userUuid,
      },
    });

    const itemsData: Prisma.ItemCreateManyInput[] = [
      ...(dto.meats ?? []).map((meat) => ({
        grillUuid: grill.uuid,
        meat,
        weight: calcularCarne(meat, pessoas),
      })),
      ...(dto.drinks ?? []).map((drink) => ({
        grillUuid: grill.uuid,
        drink,
        quantity: calcularBebida(drink, pessoas),
      })),
      ...(dto.sides ?? []).map((side) => ({
        grillUuid: grill.uuid,
        side,
        quantity: 1,
      })),
      ...(dto.vegetables ?? []).map((vegetable) => ({
        grillUuid: grill.uuid,
        vegetable,
        quantity: 1,
      })),
    ];

    const carvao = calcularCarvao(pessoas);
    const gelo = calcularGelo(carvao);

    itemsData.push(
      { grillUuid: grill.uuid, extra: 'CARVAO', quantity: carvao },
      { grillUuid: grill.uuid, extra: 'GELO', quantity: gelo },
    );

    await this.prisma.item.createMany({ data: itemsData });

    await this.comprovanteService.create({
      grillUuid: grill.uuid,
      city: dto.city,
      date: dto.date,
    });

    return grill;
  }

  async findAll() {
    return this.prisma.grill.findMany();
  }

  async findByUuid(uuid: string) {
    const grill = await this.prisma.grill.findUnique({
      where: { uuid },
      include: { items: true },
    });

    if (!grill) {
      throw new NotFoundException('Churrasco não encontrado');
    }

    return grill;
  }

  async remove(uuid: string) {
    await this.findByUuid(uuid);
    return this.prisma.grill.delete({ where: { uuid } });
  }
}