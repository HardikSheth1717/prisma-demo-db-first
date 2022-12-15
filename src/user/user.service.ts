import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { user as User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async getUser(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: userWhereUniqueInput
        });
    }

    async getUsers(params: {
        skip?: number,
        take?: number,
        cursor?: Prisma.userWhereUniqueInput,
        where?: Prisma.userWhereInput,
        orderBy?: Prisma.userOrderByWithRelationInput
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prismaService.user.findMany({
            skip, take, cursor, where, orderBy
        });
    }

    async create(data: Prisma.userCreateInput): Promise<User> {
        return this.prismaService.user.create({ data });
    }

    async update(params: {
        where: Prisma.userWhereUniqueInput,
        data: Prisma.userUpdateInput
    }): Promise<User> {
        const { where, data } = params;
        return this.prismaService.user.update({
            data,
            where
        });
    }

    async delete(where: Prisma.userWhereUniqueInput): Promise<User> {
        return this.prismaService.user.delete({
            where
        });
    }
}