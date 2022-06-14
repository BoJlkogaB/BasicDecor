import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ClosingTasksDto {
  @ApiProperty({ example: '1', description: 'Task ID' })
  @IsNumber({}, { message: 'The value must be a number' })
  readonly id: number;

  @ApiProperty({ example: '...', description: 'Random text' })
  @IsString({ message: 'The value must be a string' })
  readonly text: string;
}
