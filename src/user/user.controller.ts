import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { UpdateBalanceDto } from './dto/updateBalance.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateBalance')
  updateBalance(@Body() updateBalanceDto: UpdateBalanceDto) {
    return this.userService.updateBalance(updateBalanceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateStatus')
  updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return this.userService.updateStatus(updateStatusDto);
  }
}
