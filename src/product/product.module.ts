import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ProductSchema, { productSchemaName } from 'src/models/ProductSchema';
import TransactionSchema, {
  transactionSchemaName,
} from 'src/models/TransactionSchema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import UserSchema, { userSchemaName } from 'src/models/UserSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: productSchemaName, schema: ProductSchema },
      { name: transactionSchemaName, schema: TransactionSchema },
      { name: userSchemaName, schema: UserSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, UserService],
})
export class ProductModule {}
