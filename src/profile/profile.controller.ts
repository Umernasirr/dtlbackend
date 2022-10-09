import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateBalanceDto } from './dto/updateBalance.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getAll() {
    return await this.profileService.getAll();
  }

  @Get('by-id/:userId')
  async getAllByUser(@Param('userId') userId: string) {
    return await this.profileService.getAllByUser(userId);
  }

  @Post('create')
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return await this.profileService.createProfile(createProfileDto);
  }

  @Patch('updateBalance')
  async updateBalance(@Body() updateBalanceDto: UpdateBalanceDto) {
    return await this.profileService.updateBalance(updateBalanceDto);
  }

  @Patch('updateStatus')
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return await this.profileService.updateStatus(updateStatusDto);
  }
}
