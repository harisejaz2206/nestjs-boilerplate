import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../src/config/app.config';
import { HealthController } from '../src/modules/health/health.controller';
import { HealthModule } from '../src/modules/health/health.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig],
        }),
        HealthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('boots the health module and resolves the health controller', () => {
    const controller = app.get(HealthController);
    const result = controller.check();

    expect(result.status).toBe('ok');
    expect(result.environment).toBeDefined();
  });

  afterEach(async () => {
    await app.close();
  });
});
