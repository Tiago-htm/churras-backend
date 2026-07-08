import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, Matches } from 'class-validator';

export class CreateClimateDto {
  @ApiProperty({ example: 'Itajubá', description: 'Nome da cidade' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: '2026-07-19', description: 'Data no formato YYYY-MM-DD' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date deve estar no formato YYYY-MM-DD' })
  date: string;
}