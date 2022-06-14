import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UsersModule } from '../users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshTokens } from '../refresh-tokens/models/refresh-tokens.model';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';
import { Users } from '../users/models/users.model';

@Module({
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
  imports: [
    SequelizeModule.forFeature([RefreshTokens, Users]),
    RefreshTokensModule,
    UsersModule,
  ],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
