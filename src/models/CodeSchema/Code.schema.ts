import mongoose from 'mongoose';

import { productSchemaName } from '../ProductSchema';
import { userSchemaName } from '../UserSchema';

const CodeSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    required: true,
    default: false,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: productSchemaName,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchemaName,
    default: null,
  },
});

export default CodeSchema;
