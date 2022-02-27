import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, productSchemaName } from 'src/models/ProductSchema';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(productSchemaName) private productModal: Model<Product>,
  ) {}

  async getAll() {
    const products = await this.productModal.find();

    if (!products) {
      throw new HttpException('Products Not Found', HttpStatus.BAD_REQUEST);
    }

    return {
      data: {
        products,
      },
      status: HttpStatus.OK,
    };
  }
}
