/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return { email: user.email, id: user.id };
        }
        throw new UnauthorizedException('Invalid login details');
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const token = this.jwtService.sign({ userId: user.id });
        return { token };
    }
}
