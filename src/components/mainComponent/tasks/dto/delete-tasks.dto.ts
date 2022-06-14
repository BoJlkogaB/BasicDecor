import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class DeleteTasksDto {
  @ApiProperty({ example: '1', description: 'Task ID' })
  @IsNumber({}, { message: 'The value must be a number' })
  readonly id: number;

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
