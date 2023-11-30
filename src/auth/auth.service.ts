import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { ILogin, INewUser } from "./auth.interface";
import * as argon from 'argon2';
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from 'src/user/user.entity';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable({})

export class AuthService {
    constructor(
      @InjectEntityManager()
      private readonly entityManager: EntityManager,
      private jwt: JwtService,
      private config: ConfigService,
    ) {}

    async login(dto: ILogin) {
        const email = dto.email
        const existingUser = await this.entityManager.findOne(User, { where: [{ email }] });
        if(!existingUser){
            throw new ForbiddenException('User does not exists');
        }
        const pswMatch = await argon.verify(existingUser.password, dto.password)
        if(!pswMatch){
            throw new ForbiddenException('Email or password is incorrect');
        }
        
        const { password, ...result } = existingUser;

        const token = await this.signInToken(existingUser.id, existingUser.email);

        return {
            data: {
                user: result,
                access_token: token,
            },
            success: true,
            message: "User Logged in Successfully"
        }
    }

    async createUser(dto: INewUser) {
        const hash = await argon.hash(dto.password)
        const userData = {
            ...dto,
            password: hash,
        }

        const email = dto.email
        const existingUser = await this.entityManager.findOne(User, { where: [{ email }] });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const createdUser = await this.entityManager.save(User, userData);

        const { password, ...result } = createdUser;

        return result;
    }

    async signInToken (id:number, email:string): Promise<string> {
        const payload = {
            sub: id,
            email,
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '120m',
            secret: this.config.get('JWT_SECRET')
        })

        return token;
    }
}