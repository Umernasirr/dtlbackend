import mongoose from 'mongoose';
import { codeSchemaName } from '../CodeSchema';
import { productSchemaName } from '../ProductSchema';
import { userSchemaName } from '../UserSchema';

const TransactionSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: productSchemaName,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchemaName,
  },

  price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default TransactionSchema;
