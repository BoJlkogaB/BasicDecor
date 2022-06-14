import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/models/users.model';

interface RefreshTokenCreationAttrs {
  userID: string;
  token: string;
}

@Table({ tableName: 'RefreshTokens' })
export class RefreshTokens extends Model<
  RefreshTokens,
  RefreshTokenCreationAttrs
> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'eyJhbGciOi4b6bea0b...',
    description: 'Refresh token',
  })
  @Column({ type: DataType.TEXT, unique: true })
  token: string;

  @ApiProperty({
    example: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    description: 'User ID',
  })
  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING })
  userID: string;

  @BelongsTo(() => Users)
  user: Users;
}
