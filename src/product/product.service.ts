import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, productSchemaName } from 'src/models/ProductSchema';
import {
  Transaction,
  transactionSchemaName,
} from 'src/models/TransactionSchema';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(productSchemaName) private productModel: Model<Product>,
    @InjectModel(transactionSchemaName)
    private transactionModel: Model<Transaction>,
  ) {}

  async getAll(clients: any) {
    const products = await this.productModel.find();

    if (!products) {
      throw new HttpException('Products Not Found', HttpStatus.BAD_REQUEST);
    }

    const filteredProducts = products.filter((product: any) => {
      let isFound = false;

      const productFound = clients.find((client) => {
        return client?.toString() === product.client?.toString();
      });

      if (productFound) isFound = true;
      return isFound;
    });

    return {
      data: {
        products: filteredProducts,
      },
      status: HttpStatus.OK,
    };
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    }

    return {
      data: {
        product,
      },
      status: HttpStatus.OK,
    };
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { name, price } = createProductDto;
    if (!name) {
      throw new HttpException(
        'Request Body must include name',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!price) {
      throw new HttpException(
        'Request Body must include price',
        HttpStatus.BAD_REQUEST,
      );
    }

    const productExists = await this.productModel.findOne({ name });
    if (productExists) {
      throw new HttpException(
        'Product With Same Name Already Exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdProduct = new this.productModel(createProductDto);

    createdProduct.save();
    return {
      data: {
        product: createdProduct,
      },
      status: HttpStatus.OK,
    };
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const { id, name, price } = updateProductDto;

    const existingProduct = await this.productModel.findById(id);
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        {
          name: name || existingProduct.name,
          price: price || existingProduct.price,
        },
        {
          new: true,
        },
      );
      return {
        data: {
          product: updatedProduct,
        },
        status: HttpStatus.OK,
      };
    } catch (e) {
      throw new HttpException(e.codeName, HttpStatus.BAD_REQUEST);
    }
  }
}
