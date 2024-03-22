import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ESTUDIANTE } from 'src/models/models';
import { EstudianteSchema } from './schema/estudiante.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ESTUDIANTE.name,
        useFactory: () => EstudianteSchema,
      },
    ]),
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [EstudianteService],
})
export class EstudianteModule {}
