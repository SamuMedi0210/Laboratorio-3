import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateOrderDetailDto { 
 
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    quantity: number = 0;

    @IsString()
    @IsNotEmpty()
    order: string;

    @IsString()
    @IsNotEmpty()
    product: string;

}
