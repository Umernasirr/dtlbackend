import mongoose from 'mongoose';
import { clientSchemaName } from '../ClientSchema';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: clientSchemaName,
    },
  },
  {
    timestamps: true,
  },
);

export default ProductSchema;
