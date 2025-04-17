/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ) {}

    async createPost(createPostDto: CreatePostsDto): Promise<Post> {
        const newPost = this.postsRepository.create(createPostDto)
        return this.postsRepository.save(newPost);
    }

    async getAllPosts(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    async getPostById(id: number): Promise<Post | null > {
        return this.postsRepository.findOne({ where: { id }});
    }

    async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
        const post = await this.getPostById(id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
          }

        Object.assign(post, updatePostDto);
        return this.postsRepository.save(post);
    }

    async deletePost(id: number): Promise<boolean>{
        const post = await this.getPostById(id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
          }
        const result = await this.postsRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
