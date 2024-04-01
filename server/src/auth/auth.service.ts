import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async signUp(user):Promise<any> {
        const check = await this.usersService.getByEmail(user.email);
        if (check) {
            throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
        }
        const hasdPassword = await argon2.hash(user.password);
        const newUser={
            ...user,
            password:hasdPassword
        }
        return this.usersService.create(newUser);
    } 
    async signIn(user):Promise<any>{
        const check = await this.usersService.getByEmail(user.email);
        if (!check) {
            throw new HttpException('Email đã đăng ký', HttpStatus.BAD_REQUEST);
        }
        if (check.active==1) {
            throw new HttpException('Tài khoản đã bị khoá', HttpStatus.BAD_REQUEST);
        }
        const checkPassword = await argon2.verify(check.password, user.password);
        if (!checkPassword) {
            throw new HttpException('Mật khẩu không đúng', HttpStatus.BAD_REQUEST);
        }

        return {
            token: await this.generateToken({
                email: check.email,
                id: check.user_id
            }),
            user: check,
            access_token: await this.generateAccessToken({
                email: check.email,
                id: check.user_id
            })
        }
    }

    async generateToken(payload) {
        return this.jwtService.signAsync(payload, { expiresIn: '1d', secret: 'token' });
    }
    async generateAccessToken(payload) {
        return this.jwtService.signAsync(payload, { expiresIn: '1d', secret: 'access - token' });
    }
}
