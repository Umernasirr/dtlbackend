import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ProductSchema, { productSchemaName } from 'src/models/ProductSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: productSchemaName, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
