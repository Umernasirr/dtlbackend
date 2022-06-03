import mongoose from 'mongoose';
import { clientSchemaName } from '../ClientSchema';
import { userSchemaName } from '../UserSchema';

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userSchemaName,
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: clientSchemaName,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default ProfileSchema;
