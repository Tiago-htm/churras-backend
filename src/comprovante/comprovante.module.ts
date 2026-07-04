import { Module } from '@nestjs/common';
import { ComprovanteController } from './comprovante.controller';
import { ComprovanteService } from './comprovante.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClimateModule } from '../climate/climate.module';

@Module({
  imports: [PrismaModule, ClimateModule],
  controllers: [ComprovanteController],
  providers: [ComprovanteService],
  exports: [ComprovanteService],
})
export class ComprovanteModule {}