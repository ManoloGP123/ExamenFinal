import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { EstudianteService } from 'src/estudiantes/estudiante.service';
import { CursosService } from 'src/cursos/cursos.service'; 

import { InscripcionesDTO } from './dto/inscripciones.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('inscripciones')
@Controller('api/v1/inscripciones')
export class InscripcionesController {
  constructor(
    private readonly inscripcionesService: InscripcionesService,
    private readonly estudianteService: EstudianteService,
    private readonly cursosService: CursosService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Crear Inscripcion' })
  insertar(@Body() inscripcionesDTO: InscripcionesDTO) {
    return this.inscripcionesService.insertar(inscripcionesDTO);
  }
  @Get()
  @ApiOperation({ summary: 'Selecciona todas las inscripciones' })
  todos() {
    return this.inscripcionesService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.inscripcionesService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() inscripcionesDTO: InscripcionesDTO) {
    return this.inscripcionesService.actualizar(id, inscripcionesDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.inscripcionesService.eliminar(id);
  }
  @Post(':inscripcionId/estudiante/:estudianteId')
  async agregarEstudiante(
    @Param('inscripcionId') inscripcionId: string,
    @Param('estudianteId') estudianteId: string,
  ) {
    const estudiante = await this.estudianteService.uno(estudianteId);
    if (!estudiante)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    return this.inscripcionesService.insertarEstudiante(
      inscripcionId,
      estudianteId,
    );
      
  }

  @Post(':inscripcionId/cursos/:cursosId')
  async agregarCursos(
    @Param('inscripcionId') inscripcionId: string,
    @Param('cursosId') cursosId: string,
  ) {
    const cursos = await this.cursosService.uno(cursosId);
    if (!cursos)
      throw new HttpException('Curso no encontrado', HttpStatus.NOT_FOUND);
    return this.inscripcionesService.insertarCursos(
      inscripcionId,
      cursosId,
    );
      
  }
}
