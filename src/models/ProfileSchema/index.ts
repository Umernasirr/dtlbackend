import { Document } from 'mongoose';

import ProfileSchema from './Profile.schema';

export interface Profile extends Document {
  userId: string;
  balance: number;
  status: boolean;
}

export const profileSchemaName = 'profile';

export default ProfileSchema;
