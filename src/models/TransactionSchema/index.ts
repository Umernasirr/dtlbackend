import { Document } from 'mongoose';

import TransactionSchema from './Transaction.schema';

export interface Transaction extends Document {
  productId: string;
  productName: string;
  userId: string;
  price: number;
  createdAt?: Date;
}

export const transactionSchemaName = 'Transaction';

export default TransactionSchema;
