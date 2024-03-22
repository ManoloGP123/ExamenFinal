import mongoose from 'mongoose';
export const CursosSchema = new mongoose.Schema(
  {
    idioma: { type: String, required: true },
    profesor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profesor' }],
  },
  {
    timestamps: true,
  },
);
