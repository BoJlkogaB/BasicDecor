import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshTokens } from './models/refresh-tokens.model';
import { SaveRefreshTokensDto } from './dto/save-refresh-tokens.dto';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectModel(RefreshTokens) private repository: typeof RefreshTokens,
  ) {}

  async saveRefreshToken(dto: SaveRefreshTokensDto) {
    const token: RefreshTokens = await this.repository.findOne({
      where: { userID: dto.userID },
    });

    if (token) {
      return await this.repository.update(
        { token: dto.token },
        { where: { userID: token.userID } },
      );
    }

    return await this.repository.create(dto);
  }

  async findToken(refreshToken: string) {
    return await this.repository.findOne({ where: { token: refreshToken } });
  }

  async destroy(refreshToken: string) {
    return await this.repository.destroy({ where: { token: refreshToken } });
  }
}
