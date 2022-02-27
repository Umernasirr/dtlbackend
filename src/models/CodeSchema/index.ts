import { Document } from 'mongoose';

import UserSchema from './User.schema';

export interface Code extends Document {
  status: boolean;
  productId?: string;
  userId?: string;
}

export const userSchemaName = 'User';

export default UserSchema;
