import mongoose from 'mongoose';

export class UpdateProductDto {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
}
