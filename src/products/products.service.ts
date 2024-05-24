import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
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

    // Obtener la cantidad total de Products (sin contar los eliminados)
    const totalProducts = await this.product.count({
      where: { available: true }
    });

    // Obtener la última página
    const lastPage = Math.ceil(totalProducts / limit);

    return {
      data: await this.product.findMany({
        // Filtros de paginación
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true
        }
      }),
      meta: {
        total: totalProducts,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    // Intentar traser el Product por su ID
    const product = await this.product.findFirst({
      where: {
        id,
        available: true
      }
    });

    // Si no se obtuvo el Product
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found.`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Desestructurar el DTO (utilizar todas las propiedades a excepción del 'id')
    const { id: __, ...rest } = updateProductDto;

    // Intentar encontrar el Product
    await this.findOne(id);

    // Actualizar el Product
    return this.product.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: number) {
    // Intentar encontrar el Product
    await this.findOne(id);

    // Eliminar el Product (soft delete)
    const product = await this.product.update({
      where: { id },
      data: {
        available: false
      }
    });

    return product;
  }
}
