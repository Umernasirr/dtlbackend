import mongoose from 'mongoose';
import bcrypt = require('bcryptjs');

import { clientSchemaName } from '../ClientSchema';
import { productSchemaName } from '../ProductSchema';
import { userSchemaName } from '../UserSchema';

const CodeSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

CodeSchema.pre('insertMany', function (next, docs) {
  try {
    docs.map((code) => {
      const codeId = `${code.clientId}-${code.productId}-${code._id}`;
      const hashedCodeId = bcrypt.hashSync(codeId, 1);
      code['hashedCodeId'] = hashedCodeId;
      code['codeId'] = codeId;
    });
  } catch (e) {
    console.log(e);
  }

  next();
});

export default CodeSchema;
