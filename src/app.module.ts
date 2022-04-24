// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CodeModule } from './code/code.module';
import { TransactionModule } from './transaction/transaction.module';
import { ClientModule } from './client/client.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),

    AuthModule,

    UserModule,

    ProductModule,

    CodeModule,

    TransactionModule,

    ClientModule,

    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
