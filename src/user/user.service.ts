import { Injectable, NotFoundException, Req } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, FindManyOptions } from "typeorm";
import { User } from './user.entity';
import { Request } from "express";
import { IUpdateUser } from "./user.interface";

@Injectable({})

export class UserService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
    ) {}
  
    async getAll() {
      const options: FindManyOptions<User> = {
        select: ['id', 'email', 'company_name', 'image', 'users', 'products', 'percentage'],
        where: { account_type: 'user' },
      };

      const allUsers = await this.entityManager.find(User, options);
      
      return {
        data: allUsers,
        success: true,
        message: "Users fetched successfully"
      };
    }

    async getUserById(id:number) {    
      const options: FindManyOptions<User> = {
        where: { id }
      };
      const user = await this.entityManager.findOne(User, options);

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      
      delete user.password;
  
      return {
        data: user,
        success: true,
        message: "User fetched successfully"
      };
    }


  async updateUser(id: number, dto: IUpdateUser) {
    const options: FindManyOptions<User> = {
      where: { id },
    };

    const user = await this.entityManager.findOne(User, options);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (dto.company_name) {
      user.company_name = dto.company_name;
    }
    if (dto.users) {
      user.users = dto.users;
    }
    if (dto.products) {
      user.products = dto.products;
    }
    if (dto.percentage) {
      user.percentage = dto.percentage;
    }
    if (dto.image) {
      user.image = dto.image;
    }

    const updatedUser = await this.entityManager.save(user);

    delete updatedUser.password;

    return {
      data: updatedUser,
      success: true,
      message: "User updated successfully"
    };
  }
}