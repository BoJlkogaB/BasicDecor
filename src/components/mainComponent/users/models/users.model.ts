import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Tasks } from '../../tasks/models/tasks.model';

interface UserCreationAttrs {
  id: string;
  email: string;
  password: string;
}

@Table({ tableName: 'Users' })
export class Users extends Model<Users, UserCreationAttrs> {
  @ApiProperty({
    example: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    description: 'Unique identifier',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Tasks)
  tasks: Tasks[];
}
