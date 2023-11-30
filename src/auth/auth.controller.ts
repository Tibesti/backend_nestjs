import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { ILogin, INewUser } from "./auth.interface";

@Controller('auth')

export class AuthController {
    constructor (private authService: AuthService) {}

    @Post("login") 
    login(@Body() dto: ILogin) {
        return this.authService.login(dto);
    }

    @Post("createUser") 
    createUser(@Body() dto: INewUser) {
        return this.authService.createUser(dto);
    }
}