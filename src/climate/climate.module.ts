import { Module } from '@nestjs/common';
import { ClimateController } from './climate.controller';
import { ClimateService } from './climate.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClimateController],
  providers: [ClimateService],
  exports: [ClimateService],
})
export class ClimateModule {}