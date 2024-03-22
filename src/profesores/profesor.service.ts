import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PROFESOR } from 'src/models/models';
import { IProfesor } from './profesor.interface';
import { Model } from 'mongoose';
import { ProfesorDTO } from './dto/profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectModel(PROFESOR.name) private readonly model: Model<IProfesor>,
  ) {}

  async insertar(profesorDTO: ProfesorDTO): Promise<IProfesor> {
    const newProfesor = new this.model(profesorDTO);
    return await newProfesor.save();
  }
  async todos(): Promise<IProfesor[]> {
    return await this.model.find();
  }
  async uno(id: string): Promise<IProfesor> {
    return await this.model.findById(id);
  }
  async actualizar(
    id: string,
    profesorDTO: ProfesorDTO,
  ): Promise<IProfesor> {
    return await this.model.findByIdAndUpdate(id, profesorDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
