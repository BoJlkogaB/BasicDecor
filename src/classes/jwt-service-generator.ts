import { JwtService } from '@nestjs/jwt';

export class JwtServiceGenerator {
  getJwtService(tokenLifeTime = '24h', secretKey = 'm2NmCPRY5PWP2282') {
    return new JwtService({
      secret: secretKey,
      signOptions: {
        expiresIn: tokenLifeTime,
      },
    });
  }
}
