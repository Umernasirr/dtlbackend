import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ProfileSchema, { profileSchemaName } from 'src/models/ProfileSchema';
import UserSchema, { userSchemaName } from 'src/models/UserSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userSchemaName, schema: UserSchema },
      { name: profileSchemaName, schema: ProfileSchema },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
