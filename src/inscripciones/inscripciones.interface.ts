import { ICursos } from 'src/cursos/cursos.interface';
import { IEstudiante } from 'src/estudiantes/estudiante.interface';

export interface IInscripciones extends Document {
  estudiante: IEstudiante[];
  cursos: ICursos[];
  fecha: Date;
}
