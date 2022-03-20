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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: codeSchemaName, schema: CodeSchema },
      { name: productSchemaName, schema: ProductSchema },
      { name: userSchemaName, schema: UserSchema },
      { name: transactionSchemaName, schema: TransactionSchema },
    ]),
  ],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
