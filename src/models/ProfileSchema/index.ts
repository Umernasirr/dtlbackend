import { Document } from 'mongoose';

import ProfileSchema from './Profile.schema';

export interface Profile extends Document {
  userId: string;
  balance: number;
  client: {
    _id: string;
    name: string;
  };
  status: boolean;
  note: string;
}

export const profileSchemaName = 'profile';

export default ProfileSchema;
