import { Document } from 'mongoose';

import ProductSchema from './Product.schema';

export interface Product extends Document {
  name: string;
  price: number;
  client: string;
}

export const productSchemaName = 'Product';

export default ProductSchema;
