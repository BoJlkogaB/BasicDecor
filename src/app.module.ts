import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './components/mainComponent/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Users } from './components/mainComponent/users/models/users.model';
import { AuthorizationModule } from './components/mainComponent/authorization/authorization.module';
import { Statuses } from './components/mainComponent/statuses/models/statuses.model';
import { StatusesModule } from './components/mainComponent/statuses/statuses.module';
import { Tasks } from './components/mainComponent/tasks/models/tasks.model';
import { TasksModule } from './components/mainComponent/tasks/tasks.module';
import { InitializerModule } from './components/initializerComponent/initializer/initializer.module';
import { RefreshTokens } from './components/mainComponent/refresh-tokens/models/refresh-tokens.model';
import { RefreshTokensModule } from './components/mainComponent/refresh-tokens/refresh-tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [RefreshTokens, Users, Tasks, Statuses],
      autoLoadModels: true,
      logging: false,
    }),
    AuthorizationModule,
    InitializerModule,
    TasksModule,
    RefreshTokensModule,
    StatusesModule,
    UsersModule,
  ],
})
export class AppModule {}
