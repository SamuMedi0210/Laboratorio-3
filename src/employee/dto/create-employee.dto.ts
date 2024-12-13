import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    firstName: string;

    @IsDate()
    @IsNotEmpty()
    birthDate: Date;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    city: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    phote: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    note?: string;
}
