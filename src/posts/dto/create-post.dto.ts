/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePostsDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    authorId: string;
}