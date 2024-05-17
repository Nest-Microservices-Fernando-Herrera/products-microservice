import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de los Pipes
  app.useGlobalPipes(new ValidationPipe({
    // Habilitandod los DTOs
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  // Levantando el servidor
  await app.listen(3000);
}
bootstrap();