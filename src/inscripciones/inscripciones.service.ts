import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INSCRIPCIONES } from 'src/models/models';
import { IInscripciones } from './inscripciones.interface';
import { InscripcionesDTO } from './dto/inscripciones.dto';


@Injectable()
export class InscripcionesService {
  constructor(
    @InjectModel(INSCRIPCIONES.name) private readonly model: Model<IInscripciones>,
  ) {}
  insertar(inscripcionesDTO: InscripcionesDTO): Promise<IInscripciones> {
    const nuevoInscripcion = new this.model(inscripcionesDTO);
    return nuevoInscripcion.save();
  }
  todos(): Promise<IInscripciones[]> {
    return this.model.find().populate('estudiante', 'cursos');
  }
  uno(id: string): Promise<IInscripciones> {
    return this.model.findById(id).populate('estudiante', 'cursos');
  }
  actualizar(id: string, inscripcionesDTO: InscripcionesDTO): Promise<IInscripciones> {
    return this.model.findByIdAndUpdate(id, inscripcionesDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Inscripción eliminada' };
  }
  async insertarEstudiante(
    inscripcionId: string,
    estudianteId: string,
  ): Promise<IInscripciones> {
    return await this.model
      .findByIdAndUpdate(
        inscripcionId,
        { $addToSet: { estudiante: estudianteId } },
        { new: true },
      )
      .populate('estudiante');
  }
  
  async insertarCursos(
    inscripcionId: string,
    cursosId: string,
  ): Promise<IInscripciones> {
    return await this.model
      .findByIdAndUpdate(
        inscripcionId,
        { $addToSet: { cursos: cursosId } },
        { new: true },
      )
      .populate('cursos');
  }
}
