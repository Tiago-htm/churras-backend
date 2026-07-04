import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClimateDto } from 'src/climate/dto/create-clima.dto';

const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Poucas nuvens',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  51: 'Garoa fraca',
  61: 'Chuva fraca',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  80: 'Pancadas de chuva',
  95: 'Tempestade',
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

  // Busca lat/long a partir do nome da cidade
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

  // Busca o clima (descrição + temperatura) pra uma data específica, usando lat/long
  private async getClimate(lat: number, lon: number, date: string) {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=temperature_2m_max,weathercode&timezone=auto&start_date=${date}&end_date=${date}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.daily || data.daily.time.length === 0) {
      throw new BadRequestException(`Sem previsão disponível para ${date}`);
    }

    const weatherCode = data.daily.weathercode[0];
    const temperature = Math.round(data.daily.temperature_2m_max[0]);
    const climate = WEATHER_CODE_MAP[weatherCode] ?? 'Desconhecido';

    return { climate, temperature };
  }
}