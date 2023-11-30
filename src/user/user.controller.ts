import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { GetUser } from "./user.decorator";
import { IUpdateUser } from "./user.interface";


@UseGuards(AuthGuard('jwt'))
@Controller('user')

export class UserController {
    constructor (private userService: UserService) {}

    @Get("getAll") 
    getAllUsers() {
        return this.userService.getAll();
    }

    @Get("me") 
    getMe(@GetUser() user: {sub:number}) {
        return this.userService.getUserById(user.sub)
    }

    @Get(":id") 
    getSingleUser(@Param('id') id: string) {
        const userId = parseInt(id, 10)
        return this.userService.getUserById(userId)
    }

    @Patch(":id") 
    async updateUser(@Param('id') id: string, @Body() dto: IUpdateUser) {
        try {
            const userId = parseInt(id, 10);
            const updatedUser = await this.userService.updateUser(userId, dto);
            return updatedUser;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}