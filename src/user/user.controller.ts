import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { UpdateBalanceDto } from './dto/updateBalance.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch('updateBalance')
  updateBalance(@Body() updateBalanceDto: UpdateBalanceDto) {
    return this.userService.updateBalance(updateBalanceDto);
  }

  @Patch('updateStatus')
  updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return this.userService.updateStatus(updateStatusDto);
  }
}
