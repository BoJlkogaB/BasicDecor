import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { Statuses } from './models/statuses.model';
import { Tasks } from '../tasks/models/tasks.model';

@Module({
  providers: [StatusesService],
  controllers: [StatusesController],
  imports: [SequelizeModule.forFeature([Statuses, Tasks])],
  exports: [SequelizeModule, StatusesService],
})
export class StatusesModule {}
