import mongoose from 'mongoose';
import bcrypt = require('bcryptjs');

import { clientSchemaName } from '../ClientSchema';
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
    required: true,
  },

  codeId: {
    type: String,
  },
  hashedCodeId: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchemaName,
    default: null,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: clientSchemaName,
    required: true,
  },
});

CodeSchema.pre('save', async function () {
  try {
    const codeId = `${this.clientId}-${this.productId}-${this._id}`;
    const hashedCodeId = bcrypt.hashSync(codeId, 1);
    this['hashedCodeId'] = hashedCodeId;
    this['codeId'] = codeId;
  } catch (e) {
    console.log(e);
  }
});

export default CodeSchema;
