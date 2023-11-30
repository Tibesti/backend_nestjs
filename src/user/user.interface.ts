import { IsNumber, IsOptional, IsString } from "class-validator";


export class IUpdateUser {
    @IsString()
    @IsOptional()
    company_name: string;

    @IsNumber()
    @IsOptional()
    users: number

    @IsNumber()
    @IsOptional()
    products: number;

    @IsString()
    @IsOptional()
    percentage: string;

    @IsString()
    @IsOptional()
    image: string;
}