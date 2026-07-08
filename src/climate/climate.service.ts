import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClimateDto } from 'src/climate/dto/create-clima.dto';

const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Poucas nuvens',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  48: 'Neblina com geada',
  51: 'Garoa fraca',
  53: 'Garoa moderada',
  55: 'Garoa forte',
  56: 'Garoa congelante fraca',
  57: 'Garoa congelante forte',
  61: 'Chuva fraca',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  66: 'Chuva congelante fraca',
  67: 'Chuva congelante forte',
  80: 'Pancadas de chuva fracas',
  81: 'Pancadas de chuva moderadas',
  82: 'Pancadas de chuva violentas',
  95: 'Tempestade',
  96: 'Tempestade com granizo fraco',
  99: 'Tempestade com granizo forte',
};
@Injectable()
export class ClimateService {
  constructor(private readonly prisma: PrismaService) {}

  async createFromForecast(dto: CreateClimateDto) {
    const { latitude, longitude } = await this.getCoordinates(dto.city);
    const { climate, temperature } = await this.getClimate(latitude, longitude, dto.date);

    return this.prisma.climate.create({
      data: {
        climate,
        temperature,
        city: dto.city,
      },
    });
  }

  private async getCoordinates(city: string) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new BadRequestException(`Cidade "${city}" não encontrada`);
    }

    const { latitude, longitude } = data.results[0];
    return { latitude, longitude };
  }

  private async getClimate(lat: number, lon: number, date: string) {
  const dataFormatada = date.split('T')[0]; 

  const today = new Date();
  const targetDate = new Date(dataFormatada);
  const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays > 16) {
    throw new BadRequestException(
      `Previsão do tempo só está disponível até 16 dias no futuro. Escolha uma data mais próxima.`,
    );
  }

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,weathercode&timezone=auto&start_date=${dataFormatada}&end_date=${dataFormatada}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.daily || data.daily.time.length === 0) {
    throw new BadRequestException(`Sem previsão disponível para ${dataFormatada}`);
  }

  const weatherCode = data.daily.weathercode[0];
  const temperature = Math.round(data.daily.temperature_2m_max[0]);
  const climate = WEATHER_CODE_MAP[weatherCode] ?? 'Desconhecido';

  return { climate, temperature };
}
}