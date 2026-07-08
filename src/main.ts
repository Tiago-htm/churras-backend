import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { setDefaultResultOrder } from 'dns';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  setDefaultResultOrder('ipv4first');

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200', // URL do seu frontend
    credentials: true, // 🔑 ISSO É CRUCIAL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Churrasco API')
    .setDescription('API para organização de churrascos')
    .setVersion('1.0')
    .addCookieAuth('token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();