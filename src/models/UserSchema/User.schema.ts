import mongoose from 'mongoose';

import bcrypt = require('bcryptjs');
import UserRole from 'src/common/enums/UserRole';

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },
});

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
