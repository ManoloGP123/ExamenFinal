import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CURSOS } from 'src/models/models';
import { ICursos } from './cursos.interface';
import { CursosDTO } from './dto/cursos.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(CURSOS.name) private readonly model: Model<ICursos>,
  ) {}
  insertar(cursosDTO: CursosDTO): Promise<ICursos> {
    const nuevoCurso = new this.model(cursosDTO);
    return nuevoCurso.save();
  }
  todos(): Promise<ICursos[]> {
    return this.model.find().populate('profesor');
  }
  uno(id: string): Promise<ICursos> {
    return this.model.findById(id).populate('profesor');
  }
  actualizar(id: string, cursosDTO: CursosDTO): Promise<ICursos> {
    return this.model.findByIdAndUpdate(id, cursosDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Curso eliminado' };
  }
  async insertarProfesor(
    cursoId: string,
    profesorId: string,
  ): Promise<ICursos> {
    return await this.model
      .findByIdAndUpdate(
        cursoId,
        { $addToSet: { profesor: profesorId } },
        { new: true },
      )
      .populate('profesor');
  }
}
