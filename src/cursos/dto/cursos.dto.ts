import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CursosDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly idioma: string;
 
}
