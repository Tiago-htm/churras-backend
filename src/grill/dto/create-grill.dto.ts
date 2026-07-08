import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsBoolean,
  IsArray,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';
import { Meat, Sides, Vegetables, Drinks, Extras } from '../../../generated/prisma/client';

export class CreateGrillDto {
  @ApiProperty({ example: 'Churrasco de sábado' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2026-07-12T15:00:00.000Z' })
  @IsDateString()
  date: string;


  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  adult: number;

  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  kids: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  isVegan: boolean;

  @ApiProperty({ example: 'Itajubá' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional({ enum: Meat, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Meat, { each: true })
  meats?: Meat[];

  @ApiPropertyOptional({ enum: Sides, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Sides, { each: true })
  sides?: Sides[];

  @ApiPropertyOptional({ enum: Vegetables, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Vegetables, { each: true })
  vegetables?: Vegetables[];

  @ApiPropertyOptional({ enum: Drinks, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Drinks, { each: true })
  drinks?: Drinks[];

  @ApiPropertyOptional({ enum: Extras, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Extras, { each: true })
  extras?: Extras[]; // depois arrumar pra funcionar conforme pedido da nicole...
}