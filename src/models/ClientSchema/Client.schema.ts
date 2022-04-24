import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default ClientSchema;
