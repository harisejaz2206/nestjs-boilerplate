import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service.js';
import type { HealthStatus } from './health.service.js';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check application health' })
  @ApiOkResponse({
    description: 'Application process is running.',
    schema: {
      example: {
        status: 'ok',
        uptime: 12.34,
        timestamp: '2026-06-09T12:00:00.000Z',
        environment: 'development',
      },
    },
  })
  check(): HealthStatus {
    return this.healthService.check();
  }
}
