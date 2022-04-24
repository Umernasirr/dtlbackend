import { Document } from 'mongoose';

import ClientSchema from './Client.schema';

export interface Client extends Document {
  name: string;
}

export const clientSchemaName = 'Client';

export default ClientSchema;
