import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface HealthStatus {
  status: 'ok';
  uptime: number;
  timestamp: string;
  environment: string;
}

@Injectable()
export class HealthService {
  constructor(private readonly configService: ConfigService) {}

  check(): HealthStatus {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: this.configService.get<string>('app.nodeEnv', 'development'),
    };
  }
}
