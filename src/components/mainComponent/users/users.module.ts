import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/users.model';
import { Tasks } from '../tasks/models/tasks.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([Users, Tasks])],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
