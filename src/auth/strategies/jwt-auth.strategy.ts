import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/models/UserSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from '../auth.module';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private users: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { phoneNumber } = payload;
    const user = await this.users.findOne({ phoneNumber });

    if (!user) {
      throw new UnauthorizedException('JwtStrategy unauthorized');
    }

    return user;
  }
}
