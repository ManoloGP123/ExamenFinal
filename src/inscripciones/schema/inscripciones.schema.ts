import mongoose from 'mongoose';
export const InscripcionesSchema  = new mongoose.Schema(
  {
    estudiante: [{ type: mongoose.Schema.Types.ObjectId, ref: 'estudiante' }],
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cursos' }],
    fecha: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);
