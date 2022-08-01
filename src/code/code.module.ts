import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import CodeSchema, { codeSchemaName } from 'src/models/CodeSchema';
import ProductSchema, { productSchemaName } from 'src/models/ProductSchema';
import UserSchema, { userSchemaName } from 'src/models/UserSchema';
import TransactionSchema, {
  transactionSchemaName,
} from 'src/models/TransactionSchema';
import ProfileSchema, { profileSchemaName } from 'src/models/ProfileSchema';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: codeSchemaName, schema: CodeSchema },
      { name: productSchemaName, schema: ProductSchema },
      { name: profileSchemaName, schema: ProfileSchema },

      { name: userSchemaName, schema: UserSchema },
      { name: transactionSchemaName, schema: TransactionSchema },
    ]),
  ],
  controllers: [CodeController],
  providers: [CodeService, UserService],
})
export class CodeModule {}
