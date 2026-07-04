import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GrillController } from './grill.controller';
import { GrillService } from './grill.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ComprovanteModule } from '../comprovante/comprovante.module';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [PrismaModule, ComprovanteModule],
  controllers: [GrillController],
  providers: [GrillService],
})
export class GrillModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'grill', method: RequestMethod.POST });
  }
}