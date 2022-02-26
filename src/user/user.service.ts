import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userSchemaName } from 'src/models/UserSchema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import sanitizeUser from 'src/utils/sanitizeUser';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(userSchemaName) private userModel: Model<User>,
    private jwtTokenService: JwtService,
  ) {}
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
}
