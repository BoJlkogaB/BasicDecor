import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTasksDto {
  @ApiProperty({ example: 'Task #1', description: 'Unique task name' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 256, {
    message: 'The name must be at least 2 and no more than 128 characters',
  })
  readonly name: string;

  @ApiProperty({
    example: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    description: 'User ID',
  })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The userID must be at least 2 and no more than 128 characters',
  })
  readonly userID: string;
}
