import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('active')
  getAllActive() {
    return this.userService.getAllActive();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
