import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CodeModule } from './code/code.module';

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://umer:umer@cluster0.ecngt.mongodb.net/dtlapp?retryWrites=true&w=majority';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),

    AuthModule,

    UserModule,

    ProductModule,

    CodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
