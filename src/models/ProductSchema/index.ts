import { Document } from 'mongoose';

import ProductSchema from './Product.schema';

export interface Product extends Document {
  name: string;
  price: number;
}

export const productSchemaName = 'Product';

export default ProductSchema;
