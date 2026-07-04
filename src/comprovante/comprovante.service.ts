import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClimateService } from '../climate/climate.service';
import { CreateComprovanteDto } from './dto/create-comprovante.dto';

@Injectable()
export class ComprovanteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly climateService: ClimateService,
  ) {}

  async create(dto: CreateComprovanteDto) {
    const climate = await this.climateService.createFromForecast({
      city: dto.city,
      date: dto.date,
    });

    return this.prisma.comprovante.create({
      data: { grillUuid: dto.grillUuid, climateUuid: climate.uuid },
    });
  }

  async findByUuid(uuid: string) {
    const comprovante = await this.prisma.comprovante.findUnique({
      where: { uuid },
      include: { grill: { include: { items: true } }, climate: true },
    });

    if (!comprovante) throw new NotFoundException('Comprovante não encontrado');

    return {
      ...comprovante,
      dicas: this.gerarDicas(comprovante.climate.climate),
      resumo: this.gerarResumo(comprovante.grill.items),
    };
  }

  private gerarDicas(climate: string): string[] {
    const dicas: string[] = [];
    if (/chuva|garoa|tempestade/i.test(climate)) {
      dicas.push('Chance de chuva alta: prepare um espaço coberto');
      dicas.push('Mantenha o carvão protegido e tenha uma lona à mão');
    }
    if (/limpo|nublado/i.test(climate) === false) {
      dicas.push('Leve protetor solar e água extra');
    }
    return dicas;
  }

  private gerarResumo(items: any[]) {
    const totalCarne = items
      .filter((i) => i.meat)
      .reduce((sum, i) => sum + (i.weight ?? 0), 0);

    const totalBebida = items
      .filter((i) => i.drink)
      .reduce((sum, i) => sum + (i.quantity ?? 0), 0);

    const totalAcompanhamentos = items.filter((i) => i.side || i.vegetable).length;

    return {
      totalCarneKg: Number(totalCarne.toFixed(2)),
      totalBebidaLitros: Number(totalBebida.toFixed(2)),
      totalAcompanhamentos,
    };
  }
}