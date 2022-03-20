import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Code, codeSchemaName } from 'src/models/CodeSchema';
import { CreateCodeDto } from './dto/createCode.dto';
import { Model } from 'mongoose';
import { CreateCodeBatchDto } from './dto/createCodeBatch.dto';
import { Product, productSchemaName } from 'src/models/ProductSchema';
import { User, userSchemaName } from 'src/models/UserSchema';
import {
  Transaction,
  transactionSchemaName,
} from 'src/models/TransactionSchema';
@Injectable()
export class CodeService {
  constructor(
    @InjectModel(codeSchemaName) private readonly codeModel: Model<Code>,
    @InjectModel(productSchemaName)
    private readonly productModel: Model<Product>,
    @InjectModel(userSchemaName) private readonly userModel: Model<User>,
    @InjectModel(transactionSchemaName)
    private readonly transactionModal: Model<Transaction>,
  ) {}

  async getAll() {
    const codes = await this.codeModel.find();

    return {
      data: {
        codes,
      },
      status: HttpStatus.OK,
    };
  }

  async getAllByProduct(productId: string) {
    const codes = await this.codeModel
      .find(
        {},
        {
          productId,
        },
      )
      .select('status userId codeId');

    return {
      data: {
        codes,
      },
      status: HttpStatus.OK,
    };
  }

  createCode(createCodeDto: CreateCodeDto) {
    const { productId } = createCodeDto;

    if (!productId)
      throw new HttpException(
        'Request Body must include productId',
        HttpStatus.BAD_REQUEST,
      );

    const code = new this.codeModel(createCodeDto);

    code.save();

    return {
      data: {
        code,
      },
      status: HttpStatus.OK,
    };
  }

  createCodeBatch(createCodeDto: CreateCodeBatchDto) {
    const { productId, count } = createCodeDto;

    if (!productId)
      throw new HttpException(
        'Request Body must include productId',
        HttpStatus.BAD_REQUEST,
      );

    if (!count)
      throw new HttpException(
        'Request Body must include count',
        HttpStatus.BAD_REQUEST,
      );
    const codes = [];

    for (let i = 0; i < count; i++) {
      const code = new this.codeModel(createCodeDto);
      codes.push(code);
      code.save();
    }

    return {
      data: {
        codes,
      },
      status: HttpStatus.OK,
    };
  }

  async availCode(codeId: string, userId: string) {
    if (!codeId)
      throw new HttpException(
        'Request Body must include codeId',
        HttpStatus.BAD_REQUEST,
      );

    if (!userId)
      throw new HttpException(
        'Request Body must include userId',
        HttpStatus.BAD_REQUEST,
      );

    //  check if code is already availed
    const code = await this.codeModel.findOne({
      codeId,
    });

    if (code.status)
      throw new HttpException('Code is Already Availed', HttpStatus.OK);

    const updatedCode = await this.codeModel.findOneAndUpdate(
      {
        codeId,
      },
      {
        status: true,
        userId,
      },
      {
        new: true,
      },
    );

    const productId = codeId.split('-')[0];

    const product = await this.productModel.findById(productId);

    const user = await this.userModel.findById(userId);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        balance: user.balance + product.price,
      },
      {
        new: true,
      },
    );

    const transaction = new this.transactionModal({
      userId,
      productName: product.name,
      codeId,
      price: product.price,
    });

    console.log(transaction);
    await transaction.save();

    return {
      data: {
        user: updatedUser,
        code: updatedCode,
        transaction: transaction,
      },
      status: HttpStatus.OK,
    };
  }

  async unavailCode(codeId: string) {
    if (!codeId)
      throw new HttpException(
        'Request Body must include codeId',
        HttpStatus.BAD_REQUEST,
      );

    const updatedCode = await this.codeModel.findOneAndUpdate(
      {
        codeId,
      },
      {
        status: false,
        userId: null,
      },
      {
        new: true,
      },
    );

    return {
      data: {
        code: updatedCode,
      },
      status: HttpStatus.OK,
    };
  }
}
