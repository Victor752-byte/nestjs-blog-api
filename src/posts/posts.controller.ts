/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Post()
    async create(@Body() post: CreatePostsDto) {
        return await  this.postsService.createPost(post)
    }

    @Get()
    async findAllPost() {
        return await  this.postsService.getAllPosts();
    }

    @Get(':id')
    async findOnePost(@Param('id') id: number) {
        return await  this.postsService.getPostById(id);
    }

    @Put(':id')
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatedPost: UpdatePostDto
    ) {
        return await this.postsService.updatePost(id, updatedPost)
    }

    @Delete(':id')
    async deletePost(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.postsService.deletePost(id)
    }
}
