import { Document } from 'mongoose';

import CodeSchema from './Code.schema';

export interface Code extends Document {
  status: boolean;
  productId: string;
  userId?: string;
  codeId: string;
  hashedCodeId: string;
  clientId: string;
}

export const codeSchemaName = 'Code';

export default CodeSchema;
