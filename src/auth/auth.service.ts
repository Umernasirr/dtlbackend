import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt = require('bcryptjs');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userSchemaName } from 'src/models/UserSchema';
import { JwtService } from '@nestjs/jwt';
import sanitizeUser from 'src/utils/sanitizeUser';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(userSchemaName) private userModel: Model<User>,
    private jwtTokenService: JwtService,
  ) {}

  async login(phoneNumber: string, password: string) {
    const userExists = await this.userModel.findOne({ phoneNumber });

    if (!userExists)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    const passwordMatches = bcrypt.compareSync(password, userExists.password);

    if (passwordMatches) {
      return sanitizeUser(userExists);
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async createToken(user: User) {
    return this.jwtTokenService.sign(user);
  }

  async register(user: User) {
    const { phoneNumber } = user;
    const userExists = await this.userModel.findOne({ phoneNumber });
    if (userExists) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(user);
    await createdUser.save();
    return sanitizeUser(createdUser);
  }
}
