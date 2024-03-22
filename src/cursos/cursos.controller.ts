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
import { CursosService } from './cursos.service';
import { ProfesorService } from 'src/profesores/profesor.service';
import { CursosDTO } from './dto/cursos.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('cursos')
@Controller('api/v1/cursos')
export class CursosController {
  constructor(
    private readonly cursosService: CursosService,
    private readonly profesorService: ProfesorService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Crear Curso' })
  insertar(@Body() cursosDTO: CursosDTO) {
    return this.cursosService.insertar(cursosDTO);
  }
  @Get()
  @ApiOperation({ summary: 'Selecciona todos los cursos' })
  todos() {
    return this.cursosService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.cursosService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() cursosDTO: CursosDTO) {
    return this.cursosService.actualizar(id, cursosDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.cursosService.eliminar(id);
  }
  @Post(':cursoId/profesor/:profesorId')
  async agregarProfesor(
    @Param('cursoId') cursoId: string,
    @Param('profesorId') profesorId: string,
  ) {
    const profesor = await this.profesorService.uno(profesorId);
    if (!profesor)
      throw new HttpException('Profesor not found', HttpStatus.NOT_FOUND);
    return this.cursosService.insertarProfesor(cursoId, profesorId);
  }
}
