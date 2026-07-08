import { Expose, Type } from 'class-transformer';

class GrillDto {
  @Expose() uuid: string;
  @Expose() name: string;
  @Expose() date: Date;
  @Expose() time: string;
  @Expose() adults: number;
  @Expose() kids: number;
  @Expose() isVegan: boolean;
  @Expose() city: string;
  @Expose() userUuid: string;
}

class ComprovanteDto {
  @Expose() uuid: string;
  @Expose() grillUuid: string;
  @Expose() climateUuid: string;
  @Expose() createdAt: Date;
}

export class CreateGrillResponseDto {
  @Expose()
  @Type(() => GrillDto)
  grill: GrillDto;

  @Expose()
  @Type(() => ComprovanteDto)
  comprovante: ComprovanteDto;
}