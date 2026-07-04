import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchema } from './env.validation';
import { ClimateModule } from './climate/climate.module';
import { GrillModule } from './grill/grill.module';
import { ComprovanteModule } from './comprovante/comprovante.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
    ClimateModule,
    GrillModule,
    ComprovanteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
