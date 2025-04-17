/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}
    
    async createUser(dto: CreateUserDto): Promise<Users> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = this.usersRepository.create({
            email: dto.email,
            password: hashedPassword
        });
        return this.usersRepository.save(newUser);
    }

    async findUserByEmail(email: string): Promise<Users | null> {
        return this.usersRepository.findOne({ where: { email }});
    }

    async findUserById(id: number): Promise<Users> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        return user;
      }

      async updateUser(id: number, newDetails: UpdateUserDto): Promise<Users | null>{
        await this.findUserById(id);
        await this.usersRepository.update(id, newDetails);
        return await this.usersRepository.findOneBy({ id });
         // OR
        //  const updatedUser = await this.usersRepository.update(id, newDetails);
        //  if (updatedUser.affected === 0) throw new NotFoundException('User not found');
        //  return await this.usersRepository.findOneBy({id}) 
    }

    async deleteUserById(id: number): Promise<boolean>{
        const user = await this.findUserById(id);
        const deleteUser = await this.usersRepository.delete(user.id);
        return (deleteUser.affected ?? 0) > 0
    }

       
}
