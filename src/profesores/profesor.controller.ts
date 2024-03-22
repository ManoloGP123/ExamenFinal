import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDTO } from './dto/profesor.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('profesor')
@Controller('api/v1/profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  insertar(@Body() profesorDTO: ProfesorDTO) {
    return this.profesorService.insertar(profesorDTO);
  }
  @Get()
  todos() {
    return this.profesorService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.profesorService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() profesorDTO: ProfesorDTO) {
    return this.profesorService.actualizar(id, profesorDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.profesorService.eliminar(id);
  }
}
