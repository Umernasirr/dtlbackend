import mongoose from 'mongoose';
import { productSchemaName } from '../ProductSchema';
import { userSchemaName } from '../UserSchema';

const TransactionSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

export default TransactionSchema;
