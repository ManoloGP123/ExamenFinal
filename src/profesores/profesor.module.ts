import { Module } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PROFESOR } from 'src/models/models';
import { ProfesorSchema } from './schema/profesor.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PROFESOR.name,
        useFactory: () => ProfesorSchema,
      },
    ]),
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [ProfesorService],
})
export class ProfesorModule {}
