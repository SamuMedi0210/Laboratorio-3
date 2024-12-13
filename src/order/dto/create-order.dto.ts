import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto { 
    @IsString()
    @IsNotEmpty()
    customer: string;

    @IsString()
    @IsNotEmpty()
    employee: string;

    @IsDate()
    @IsNotEmpty()
    orderDate: Date;

    @IsString()
    @IsNotEmpty()
    shipper: string;
}
