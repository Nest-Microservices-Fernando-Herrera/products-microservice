import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

@Module({
  // Lista de los módulos que exportan los providers requeridos en este mismo módulo
  imports: [ProductsModule],
  // Lista de los controladores requeridos en este módulo
  controllers: [],
  // Lista de los providers instanciados por Nest
  providers: [],
})
export class AppModule {}
