import { IProfesor } from 'src/profesores/profesor.interface';

export interface ICursos extends Document {
  idioma: string;
  profesor: IProfesor[];
}
