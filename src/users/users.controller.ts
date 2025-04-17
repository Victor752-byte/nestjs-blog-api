/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor( 
        private readonly usersService: UsersService
    ) {}

    @Get(':id') 
    async getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findUserById(id)
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard) // Protect this route; only authenticated user should have access
    @Patch(':id')
    async updateUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() newDetails: UpdateUserDto
    ) {
        return await this.usersService.updateUser(id, newDetails)
    }

    @UseGuards(JwtAuthGuard) // Protect this route; only authenticated user should have access 
    @Delete('id')
    async deleteUserProfile(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.usersService.deleteUserById(id);
    }
}
