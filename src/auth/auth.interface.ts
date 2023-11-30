import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ILogin {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class INewUser {
    @IsString()
    @IsNotEmpty()
    account_type: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsNumber()
    @IsNotEmpty()
    users: number

    @IsNumber()
    @IsNotEmpty()
    products: number;

    @IsString()
    @IsNotEmpty()
    percentage: string;

    @IsString()
    @IsOptional()
    image: string;
}