import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import { STATUSES } from '../../../../constants/statuses.constants';

export class UpdateStatusDto {
  @ApiProperty({ example: '1', description: 'Status ID' })
  @IsNumber({}, { message: 'The value must be a number' })
  readonly id: number;

  @ApiProperty({ example: STATUSES.NEW, description: 'Status name' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The name must be at least 2 and no more than 128 characters',
  })
  readonly name: string;
}
