import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  // Manejando los logs de esta sección
  const logger = new Logger('Main');

  // Creando la instancia de la app
  const app = await NestFactory.create(AppModule);

  // Configuración global de los Pipes
  app.useGlobalPipes(new ValidationPipe({
    // Habilitandod los DTOs
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  // Levantando el servidor
  await app.listen(envs.port);
  logger.log(`Products Microservice running on port ${ envs.port }`);
}
bootstrap();