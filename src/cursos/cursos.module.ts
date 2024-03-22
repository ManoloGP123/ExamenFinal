import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CURSOS } from 'src/models/models';
import { CursosSchema } from './schema/cursos.schema';
import { ProfesorModule } from 'src/profesores/profesor.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CURSOS.name,
        useFactory: () => CursosSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    ProfesorModule,
  ],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
