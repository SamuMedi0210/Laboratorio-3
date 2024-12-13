import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateShipperDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    shipperName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    phone: string;

}
