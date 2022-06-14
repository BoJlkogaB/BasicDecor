import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Tasks } from '../../tasks/models/tasks.model';
import { STATUSES } from '../../../../constants/statuses.constants';

interface StatusesCreationAttrs {
  name: string;
}

@Table({ tableName: 'Statuses' })
export class Statuses extends Model<Statuses, StatusesCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: STATUSES.NEW, description: 'Status name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Tasks)
  tasks: Tasks[];
}
