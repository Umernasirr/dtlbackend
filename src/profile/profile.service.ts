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
    const profiles = await this.profileModel.find();
    if (!profiles)
      throw new HttpException('Profiles Not Found', HttpStatus.NO_CONTENT);

    return {
      data: {
        profiles,
      },
      status: HttpStatus.OK,
    };
  }

  async getAllByUser(clientId: string, userId: string) {
    if (!userId)
      throw new HttpException(
        'userId must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    if (!clientId)
      throw new HttpException(
        'clientId must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    const profiles = await this.profileModel.find({
      userId,
    });

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
    const { clientId, userId } = createProfileDto;
    if (!clientId)
      throw new HttpException(
        'clientId must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    if (!userId)
      throw new HttpException(
        'userId must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    const existingProfile = await this.profileModel.findOne({
      clientId,
      userId,
    });

    if (existingProfile) {
      throw new ConflictException('Profile already exists');
    }

    const profile = await new this.profileModel({ clientId, userId }).save(); // create new profile

    if (!profile)
      throw new HttpException('Profile Not Created', HttpStatus.NO_CONTENT);

    return {
      data: {
        profile,
      },
      status: HttpStatus.OK,
    };
  }

  async updateBalance(updateBalanceDto: UpdateBalanceDto) {
    try {
      const updatedProfile = await this.profileModel.findByIdAndUpdate(
        updateBalanceDto.id,
        {
          balance: updateBalanceDto.balance,
        },
        {
          new: true,
        },
      );
      return updatedProfile;
    } catch (e) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    try {
      const updatedProfile = await this.profileModel.findByIdAndUpdate(
        updateStatusDto.id,
        {
          status: updateStatusDto.status,
        },
        {
          new: true,
        },
      );
      return updatedProfile;
    } catch (e) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }
  }
}
