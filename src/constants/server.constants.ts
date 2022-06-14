import { ConfigService } from '@nestjs/config';

export const API_URL =
  new ConfigService().get('API_URL') || 'http://localhost:5010/api';

export const CLIENT_URL =
  new ConfigService().get('CLIENT_URL') || 'http://localhost:3000/';
