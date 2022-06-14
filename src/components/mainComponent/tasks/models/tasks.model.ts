import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Statuses } from '../../statuses/models/statuses.model';
import { Users } from '../../users/models/users.model';

interface TaskCreationAttrs {
  name: string;
  userID: string;
  statusID: number;
}

@Table({ tableName: 'Tasks' })
export class Tasks extends Model<Tasks, TaskCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Task #1', description: 'Unique task name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    description: 'User ID',
  })
  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING })
  userID: string;

  @ApiProperty({ example: 1, description: 'Status ID' })
  @ForeignKey(() => Statuses)
  @Column({ type: DataType.INTEGER })
  statusID: number;
}
