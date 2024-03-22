import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDTO } from './dto/estudiante.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('estudiante')
@Controller('api/v1/estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  insertar(@Body() estudianteDTO: EstudianteDTO) {
    return this.estudianteService.insertar(estudianteDTO);
  }
  @Get()
  todos() {
    return this.estudianteService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.estudianteService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() estudianteDTO: EstudianteDTO) {
    return this.estudianteService.actualizar(id, estudianteDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.estudianteService.eliminar(id);
  }
}
