import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

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

  async findAll(paginationDto: PaginationDto) {
    // Desestructurando el DTO
    const { page, limit } = paginationDto;

    // Obtener la cantidad total de Products
    const totalProducts = await this.product.count();

    // Obtener la última página
    const lastPage = Math.ceil( totalProducts / limit );

    return {
      data: await this.product.findMany({
        // Filtros de paginación
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalProducts,
        page: page,
        lastPage: lastPage,
      }
    }
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
