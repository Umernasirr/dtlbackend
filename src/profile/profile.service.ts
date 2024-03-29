import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userSchemaName } from 'src/models/UserSchema';
import { Model } from 'mongoose';
import { UpdateBalanceDto } from './dto/updateBalance.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { Profile, profileSchemaName } from 'src/models/ProfileSchema';
import { CreateProfileDto } from './dto/createProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(profileSchemaName) private profileModel: Model<Profile>,
    @InjectModel(userSchemaName) private userModel: Model<User>,
  ) {}

  async getAll() {
    const profiles = await this.profileModel.find().populate('client');
    if (!profiles)
      throw new HttpException('Profiles Not Found', HttpStatus.NO_CONTENT);

    return {
      data: {
        profiles,
      },
      status: HttpStatus.OK,
    };
  }

  async getAllByUser(userId: string) {
    if (!userId)
      throw new HttpException(
        'userId must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    const profiles = await this.profileModel
      .find({
        userId,
      })
      .populate('client');

    if (!profiles)
      throw new HttpException('Profiles Not Found', HttpStatus.NO_CONTENT);

    return {
      data: {
        profiles,
      },
      status: HttpStatus.OK,
    };
  }

  async createProfile(createProfileDto: CreateProfileDto) {
    const { client, userId } = createProfileDto;
    if (!client)
      throw new HttpException(
        'client must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    if (!userId)
      throw new HttpException(
        'userId must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    const existingProfile = await this.profileModel.findOne({
      client,
      userId,
    });

    if (existingProfile) {
      throw new ConflictException('Profile already exists');
    }

    const profile = await new this.profileModel({ client, userId }).save(); // create new profile

    if (!profile)
      throw new HttpException('Profile Not Created', HttpStatus.NO_CONTENT);

    const profiles = await this.profileModel
      .find({
        userId,
      })
      .populate('client');

    return {
      data: {
        profiles,
      },
      status: HttpStatus.OK,
    };
  }

  async updateBalance(updateBalanceDto: UpdateBalanceDto) {
    try {
      const updatedProfile = await this.profileModel
        .findByIdAndUpdate(
          updateBalanceDto.profileId,
          {
            balance: updateBalanceDto.balance,
            note: updateBalanceDto.note,
          },
          {
            new: true,
          },
        )
        .populate('client');
      return updatedProfile;
    } catch (e) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    try {
      const updatedProfile = await this.profileModel
        .findByIdAndUpdate(
          updateStatusDto.id,
          {
            status: updateStatusDto.status,
          },
          {
            new: true,
          },
        )
        .populate('client');
      return updatedProfile;
    } catch (e) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
  }
}
