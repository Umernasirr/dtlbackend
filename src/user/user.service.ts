import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userSchemaName } from 'src/models/UserSchema';
import { Model } from 'mongoose';
import sanitizeUser from 'src/common/utils/sanitizeUser';
import { UpdateBalanceDto } from './dto/updateBalance.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel(userSchemaName) private userModel: Model<User>) {}
  async getAll() {
    const users = await this.userModel.find();

    if (!users)
      throw new HttpException('Users Not Found', HttpStatus.BAD_REQUEST);

    const sanitizedUsers = users.map((user) => sanitizeUser(user));

    return {
      data: {
        users: sanitizedUsers,
      },
      status: HttpStatus.OK,
    };
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user)
      throw new HttpException('Users Not Found', HttpStatus.BAD_REQUEST);

    const sanitizedUser = sanitizeUser(user);
    return {
      data: {
        user: sanitizedUser,
      },
      status: HttpStatus.OK,
    };
  }

  async updateBalance(updateBalanceDto: UpdateBalanceDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        updateBalanceDto.id,
        {
          balance: updateBalanceDto.balance,
        },
        {
          new: true,
        },
      );

      return updatedUser;
    } catch (e) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      updateStatusDto.id,
      {
        status: updateStatusDto.status,
      },
      {
        new: true,
      },
    );

    return updatedUser;
  }
}
