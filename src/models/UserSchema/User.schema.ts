import mongoose from 'mongoose';

import bcrypt = require('bcryptjs');
import UserRole from 'src/common/enums/UserRole';

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

    location: {
      type: String,
    },
    mechanic: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    shopNo: {
      type: String,
      required: true,
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
