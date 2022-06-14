import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUsersDto {
  @ApiProperty({
    example: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    description: 'User ID',
  })
  @IsString({ message: 'The value must be a string' })
  readonly id: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @IsString({ message: 'The value must be a string' })
  @IsEmail({}, { message: 'Incorrect Email' })
  @Length(6, 128, {
    message: 'The email must be at least 6 and no more than 128 characters',
  })
  readonly email: string;

  @ApiProperty({ example: 'Qwerty12345!', description: 'User password' })
  @IsString({ message: 'The value must be a string' })
  @Length(8, 32, {
    message: 'The password must be at least 8 and no more than 32 characters',
  })
  password: string;
}
