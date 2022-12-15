import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post/post.service';
import { UserService } from './user/user.service';

import { post as PostModel, user as User } from '@prisma/client';

@Controller('app')
export class AppController {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers({});
  }

  @Get('search-user/:srcstr')
  getUsersByCondition(@Param('srcstr') srcstr: string): Promise<User[]> {
    return this.userService.getUsers({
      where:{
        OR: [{
          email: {
            contains: srcstr
          }, 
          name: {
            contains: srcstr
          }
        }]
      }
    });
  }

  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
}
