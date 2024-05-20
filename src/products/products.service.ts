import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
// Implementando el cliente de Prisma e inyectarlo
export class ProductsService extends PrismaClient implements OnModuleInit {
  // Manejando los logs de este servicio
  private readonly logger = new Logger('ProductsService');

  // Iniciando el módulo
  onModuleInit() {
    // Conectarnos con la B.D
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      // Especificar los datos a insertar
      data: createProductDto
    });
  }

  findAll() {
    // Traer todos los Products
    return this.product.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
