import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InitializerService } from './initializer.service';
import { InitializerController } from './initializer.controller';
import { Users } from '../../mainComponent/users/models/users.model';
import { StatusesModule } from '../../mainComponent/statuses/statuses.module';
import { UsersModule } from '../../mainComponent/users/users.module';
import { Statuses } from '../../mainComponent/statuses/models/statuses.model';

@Module({
  providers: [InitializerService],
  controllers: [InitializerController],
  imports: [
    SequelizeModule.forFeature([Users, Statuses]),
    StatusesModule,
    UsersModule,
  ],
  exports: [SequelizeModule, InitializerService],
})
export class InitializerModule {}
