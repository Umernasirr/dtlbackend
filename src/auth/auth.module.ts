import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema, { userSchemaName } from 'src/models/UserSchema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-auth.strategy';

export const SECRET_KEY = process.env.SECRET_KEY;

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1day' },
    }),
    MongooseModule.forFeature([{ name: userSchemaName, schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule], //<--here exports JwtModule
})
export class AuthModule {}
