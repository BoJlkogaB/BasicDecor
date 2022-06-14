import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tasks } from './models/tasks.model';
import { Statuses } from '../statuses/models/statuses.model';
import { Users } from '../users/models/users.model';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [SequelizeModule.forFeature([Tasks, Users, Statuses])],
  exports: [SequelizeModule, TasksService],
})
export class TasksModule {}
