import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { STATUSES } from '../../../../constants/statuses.constants';

export class CreateStatusDto {
  @ApiProperty({ example: STATUSES.NEW, description: 'Status name' })
  @IsString({ message: 'The value must be a string' })
  @Length(2, 128, {
    message: 'The name must be at least 2 and no more than 128 characters',
  })
  readonly name: string;
}
