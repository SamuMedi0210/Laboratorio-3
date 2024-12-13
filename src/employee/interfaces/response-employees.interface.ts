import { EmployeeEntity } from "../entities/employee.entity";

export interface ResponseAllEmployees{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: EmployeeEntity[];
}