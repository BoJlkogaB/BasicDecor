import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Min } from 'class-validator';
import { STATUSES } from '../../../../constants/statuses.constants';

export class FindAllTasksDto {
  @ApiProperty({ example: STATUSES.NEW, description: 'Status name' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The name must be at least 2 and no more than 128 characters',
  })
  readonly statusName: string;

  @ApiProperty({ example: 1, description: 'Page number' })
  @IsNumber({}, { message: 'The value must be a number' })
  @Min(1)
  readonly page: string;
}
