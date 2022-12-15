import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { post as Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) { }

    async getPost(where: Prisma.postWhereUniqueInput): Promise<Post | null> {
        return this.prismaService.post.findUnique({
            where
        });
    }

    async getPosts(params: {
        skip?: number,
        take?: number,
        where?: Prisma.postWhereInput,
        cursor?: Prisma.postWhereUniqueInput,
        orderBy?: Prisma.postOrderByWithRelationInput
    }): Promise<Post[]> {
        const { skip, take, where, cursor, orderBy } = params;

        return this.prismaService.post.findMany({
            skip,
            take,
            where,
            cursor,
            orderBy
        });
    }

    async create(data: Prisma.postCreateInput): Promise<Post> {
        return this.prismaService.post.create({ 
            data
         });
    }

    async update(params: {
        where: Prisma.postWhereUniqueInput,
        data: Prisma.postUpdateInput
    }): Promise<Post> {
        const { data, where } = params;

        return this.prismaService.post.update({
            data,
            where
        });
    }

    async delete(where: Prisma.postWhereUniqueInput): Promise<Post> {
        return this.prismaService.post.delete({
            where
        })
    }
}