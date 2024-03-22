import mongoose from 'mongoose';

export const ProfesorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

