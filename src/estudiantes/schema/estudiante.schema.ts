import mongoose from 'mongoose';

export const EstudianteSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

