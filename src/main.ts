import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Manejando los logs de esta sección
  const logger = new Logger('Main');

  // Creando la instancia de la app e implementar el microservicio
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    // Módulo principal de entrada
    AppModule,
    {
      /* Opciones de configuración */
      transport: Transport.TCP, // Medio de transporte,
      options: {
        port: envs.port
      }
    }
  );

  // Configuración global de los Pipes
  app.useGlobalPipes(new ValidationPipe({
    // Habilitandod los DTOs
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  // Levantando el servidor
  await app.listen();
  logger.log(`Products Microservice running on port ${envs.port}`);
}
bootstrap();