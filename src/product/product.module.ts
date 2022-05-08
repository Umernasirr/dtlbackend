import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ProductSchema, { productSchemaName } from 'src/models/ProductSchema';
import TransactionSchema, {
  transactionSchemaName,
} from 'src/models/TransactionSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: productSchemaName, schema: ProductSchema },
      { name: transactionSchemaName, schema: TransactionSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
