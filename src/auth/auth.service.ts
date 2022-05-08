import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt = require('bcryptjs');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userSchemaName } from 'src/models/UserSchema';
import { JwtService } from '@nestjs/jwt';
import sanitizeUser from 'src/common/utils/sanitizeUser';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(userSchemaName) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { phoneNumber, password } = loginDto;
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

  async createToken(user: LoginDto) {
    return this.jwtService.sign(user);
  }

  async register(user: RegisterDto) {
    const { phoneNumber } = user;
    const userExists = await this.userModel.findOne({ phoneNumber });
    if (userExists) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(user);
    await createdUser.save();
    return sanitizeUser(createdUser);
  }

  async getMe(token: string) {
    const jwt = token.replace('Bearer ', '');

    const decodedToken = this.jwtService.decode(jwt, {
      json: true,
    }) as {
      phoneNumber: string;
      password: string;
    };

    const user = await this.userModel.findOne({
      phoneNumber: decodedToken.phoneNumber,
    });

    const updatedToken = await this.createToken({
      phoneNumber: decodedToken.phoneNumber,
      password: decodedToken.password,
    });

    const sanitizedUser = sanitizeUser(user);

    return { user: sanitizedUser, token: updatedToken };
  }
}
