import { Document } from 'mongoose';
import UserRole from 'src/common/enums/UserRole';

import UserSchema from './User.schema';

export interface User extends Document {
  phoneNumber: string;
  password: string;
  name: string;
  status: boolean;
  role: UserRole;
}

export const userSchemaName = 'User';

export default UserSchema;
