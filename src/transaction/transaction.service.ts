import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  transactionSchemaName,
} from 'src/models/TransactionSchema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(transactionSchemaName)
    private transactionModel: Model<Transaction>,
  ) {}

  async getAllByUser(userId: string) {
    if (!userId)
      throw new HttpException(
        'userId must be provided in body',
        HttpStatus.BAD_REQUEST,
      );

    const transactions = await this.transactionModel.find({
      userId,
    });

    if (!transactions)
      throw new HttpException('Transactions Not Found', HttpStatus.OK);

    return {
      data: {
        transactions,
      },
      status: HttpStatus.OK,
    };
  }
}
