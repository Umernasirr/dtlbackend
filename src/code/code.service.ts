import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Code, codeSchemaName } from 'src/models/CodeSchema';
import { CreateCodeDto } from './dto/createCode.dto';
import { Model } from 'mongoose';
import { CreateCodeBatchDto } from './dto/createCodeBatch.dto';
@Injectable()
export class CodeService {
  constructor(
    @InjectModel(codeSchemaName) private readonly codeModel: Model<Code>,
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
    const codes = await this.codeModel.find(
      {},
      {
        productId,
      },
    );

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
}

// u were creating code batch
