import { Users } from '../components/mainComponent/users/models/users.model';
import { JwtServiceGenerator } from './jwt-service-generator';
import { ConfigService } from '@nestjs/config';

export class Token {
  private readonly accessTokenLifeTime: string;
  private readonly accessTokenSecretKey: string;

  private readonly refreshTokenLifeTime: string;
  private readonly refreshTokenSecretKey: string;

  private jwtServiceGenerator: JwtServiceGenerator;

  constructor() {
    this.jwtServiceGenerator = new JwtServiceGenerator();

    const config = new ConfigService();
    this.accessTokenLifeTime = config.get('ACCESS_TOKEN_LIFETIME');
    this.accessTokenSecretKey = config.get('ACCESS_TOKEN_SECRET_KEY');
    this.refreshTokenLifeTime = config.get('REFRESH_TOKEN_LIFETIME');
    this.refreshTokenSecretKey = config.get('REFRESH_TOKEN_SECRET_KEY');
  }

  generateTokens(user: Users) {
    return {
      accessToken: this.jwtServiceGenerator
        .getJwtService(this.accessTokenLifeTime, this.accessTokenSecretKey)
        .sign(this.getPayload(user)),

      refreshToken: this.jwtServiceGenerator
        .getJwtService(this.refreshTokenLifeTime, this.refreshTokenSecretKey)
        .sign(this.getPayload(user)),
    };
  }

  validateAccessToken(accessToken: string) {
    try {
      return this.jwtServiceGenerator
        .getJwtService(this.accessTokenLifeTime, this.accessTokenSecretKey)
        .verify(accessToken);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(accessToken: string) {
    try {
      return this.jwtServiceGenerator
        .getJwtService(this.refreshTokenLifeTime, this.refreshTokenSecretKey)
        .verify(accessToken);
    } catch (e) {
      return null;
    }
  }

  getPayload(user: Users) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
