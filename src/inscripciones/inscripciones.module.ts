import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { INSCRIPCIONES } from 'src/models/models';
import { InscripcionesSchema } from './schema/inscripciones.schema';
import { EstudianteModule } from 'src/estudiantes/estudiante.module';
import { CursosModule } from 'src/cursos/cursos.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: INSCRIPCIONES.name,
        useFactory: () => InscripcionesSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    EstudianteModule,
    CursosModule,
  ],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
})
export class InscripcionesModule {}
