import { ApiProperty } from '@nestjs/swagger';

export class CreateClimateDto {
  @ApiProperty({ example: 'Itajubá', description: 'Nome da cidade' })
  city: string;

  @ApiProperty({ example: '2026-07-19', description: 'Data no formato YYYY-MM-DD' })
  date: string;
}