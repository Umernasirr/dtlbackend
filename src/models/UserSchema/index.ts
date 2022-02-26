import { Document } from 'mongoose';

import UserSchema from './User.schema';

export interface User extends Document {
  phoneNumber: string;
  password: string;
}

export const userSchemaName = 'User';

export default UserSchema;
