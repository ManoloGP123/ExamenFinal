import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ESTUDIANTE } from 'src/models/models';
import { IEstudiante } from './estudiante.interface';
import { Model } from 'mongoose';
import { EstudianteDTO } from './dto/estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectModel(ESTUDIANTE.name) private readonly model: Model<IEstudiante>,
  ) {}

  async insertar(estudianteDTO: EstudianteDTO): Promise<IEstudiante> {
    const newEstudiante = new this.model(estudianteDTO);
    return await newEstudiante.save();
  }
  async todos(): Promise<IEstudiante[]> {
    return await this.model.find();
  }
  async uno(id: string): Promise<IEstudiante> {
    return await this.model.findById(id);
  }
  async actualizar(
    id: string,
    estudianteDTO: EstudianteDTO,
  ): Promise<IEstudiante> {
    return await this.model.findByIdAndUpdate(id, estudianteDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
