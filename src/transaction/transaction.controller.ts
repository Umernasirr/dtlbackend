import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/:userId')
  async getAllByUser(@Param('userId') userId: string) {
    return await this.transactionService.getAllByUser(userId);
  }
}
