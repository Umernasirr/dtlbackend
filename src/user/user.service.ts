import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userSchemaName } from 'src/models/UserSchema';
import { Model } from 'mongoose';
import sanitizeUser from 'src/common/utils/sanitizeUser';

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

  async getAllActive() {
    const users = await this.userModel.find({
      status: true,
    });

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
}
