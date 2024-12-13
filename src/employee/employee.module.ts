import { Module } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { CategoriesService } from 'src/categories/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    TypeOrmModule.forFeature([ EmployeeEntity ])
  ]
})
export class EmployeeModule {}
