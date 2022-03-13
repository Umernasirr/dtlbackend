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

  codeId: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchemaName,
    default: null,
  },
});

CodeSchema.pre('save', async function () {
  try {
    const codeId = this.productId + '-' + this._id;
    this['codeId'] = codeId;
  } catch (err) {
    console.log(err);
  }
});

export default CodeSchema;
