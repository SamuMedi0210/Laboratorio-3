import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ResponseAllEmployees } from './interfaces/response-employees.interface';
import { ManagerError } from 'src/common/errors/manager.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<ApiOneResponse<EmployeeEntity>> {
    try {
      const employee = await this.employeeRepository.save(createEmployeeDto);
      if (!employee) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Employee not created!',
        });
      }
      return {
        status: {
          statusMsg: "CREATED",
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: employee,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<EmployeeEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {

      const [total, data] = await Promise.all([
        this.employeeRepository.count({ where: { isActive: true } }),
        this.employeeRepository.find({ where: { isActive: true }, take: limit, skip: skip })
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

  async findOne(id: string): Promise<ApiOneResponse<EmployeeEntity>> {
    try {
      const employee = await this.employeeRepository.createQueryBuilder('employee')
      .where({id, isActive:true})
      .getOne()
      if (!employee) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "Employee not found",
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: employee,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const employee = await this.employeeRepository.update({ id, isActive: true }, updateEmployeeDto);
      if (employee.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Employee not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: employee,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const employee = await this.employeeRepository.update({ id, isActive: true }, { isActive: false });
      if (employee.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Employee not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: employee,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}