import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class SaveRefreshTokensDto {
  @ApiProperty({
    example: 'eyJhbGciOi4b6bea0b...',
    description: 'Refresh token',
  })
  @IsString({ message: 'The value must be a string' })
  readonly token: string;

  @ApiProperty({
    example: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    description: 'User ID',
  })
  @IsUUID('4', { message: 'The value must be a UUID v4' })
  userID: string;
}
