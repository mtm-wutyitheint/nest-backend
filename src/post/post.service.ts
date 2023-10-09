/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto) {
    const createdPost = await this.postModel.create({
      ...createPostDto,
    });
    await createdPost.save();
    return {
      message: 'Post created successfully',
      data: createdPost,
    };
  }

  async findAll() {
    const posts = await this.postModel.find().lean().exec();

    return {
      message: 'All Posts',
      data: posts.map((item, index) => ({
        ...item,
        id: index + 1,
      })),
    };
  }

  async findOne(id: any) {
    const posts = await this.postModel.find().lean().exec();
    const addPostId = posts.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('Invalid id. It must be a numeric string.');
    }
    const post = addPostId.find((post) => post.id == id);
    if (!post) {
      throw new NotFoundException('Member not found!');
    }
    return {
      message: 'Get Post success!',
      data: post,
    };
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    // return `This action removes a #${id} post`;
    const deletedMember = await this.postModel.findByIdAndRemove(id);
    if (!deletedMember) {
      throw new NotFoundException(`Post ${id} not found`);
    }
    return {
      message: 'Delete post successfully',
      data: deletedMember,
    };
  }
}
