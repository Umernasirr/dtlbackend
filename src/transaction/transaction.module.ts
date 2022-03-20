import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import TransactionSchema, {
  transactionSchemaName,
} from 'src/models/TransactionSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: transactionSchemaName, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
