import mongoose from 'mongoose';

import bcrypt = require('bcryptjs');
import UserRole from 'src/common/enums/UserRole';
import { clientSchemaName } from '../ClientSchema';

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: clientSchemaName,
        required: true,
      },
    ],

    location: {
      type: String,
    },
    mechanic: {
      type: String,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    shopName: {
      type: String,
    },
    shopAddress: {
      type: String,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next: any) {
  try {
    if (!this?.isModified('password')) {
      return next();
    }
    const hashed = bcrypt.hashSync(this['password'], 10);
    this['password'] = hashed;

    return next();
  } catch (err) {
    return next(err);
  }
});

export default UserSchema;
