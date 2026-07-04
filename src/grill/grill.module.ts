import { Module } from '@nestjs/common';
import { GrillController } from './grill.controller';
import { GrillService } from './grill.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ComprovanteModule } from '../comprovante/comprovante.module';

@Module({
  imports: [PrismaModule, ComprovanteModule],
  controllers: [GrillController],
  providers: [GrillService],
})
export class GrillModule {}