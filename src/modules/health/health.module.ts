import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

// A reusable template should expose an operational health boundary instead of
// keeping Nest's starter AppController. Deployments, load balancers, and CI
// smoke tests can depend on this module without pulling in product features.
@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
