import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<ApiOneResponse<OrderEntity>> {
    try {
      const order = await this.orderRepository.save(createOrderDto);
      if (!order) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Order not created!',
        });
      }
      return {
        status: {
          statusMsg: "CREATED",
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: order,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<OrderEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.orderRepository.count({ where: { isActive: true } }),
        this.orderRepository.createQueryBuilder('order')
          .where({ isActive: true })
          .leftJoinAndSelect('order.customer', 'customer')
          .leftJoinAndSelect('order.shipper', 'shipper')
          .leftJoinAndSelect('order.employee', 'employee')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          limit, 
          lastPage,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<OrderEntity>> {
    try {
      const order = await this.orderRepository.createQueryBuilder('order')
        .where({ id, isActive: true })
        .leftJoinAndSelect('order.customer', 'customer')
        .leftJoinAndSelect('order.shipper', 'shipper')
        .leftJoinAndSelect('order.employee', 'employee')
        .getOne()

      if (!order) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: order,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const order = await this.orderRepository.update({ id, isActive: true }, updateOrderDto);
      if (order.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: order,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const order = await this.orderRepository.update({ id, isActive: true }, { isActive: false });
      if (order.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Order not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: order,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
