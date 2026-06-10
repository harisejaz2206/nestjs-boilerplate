import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';

// Authentication belongs in a dedicated module, but the previous application
// did not include JWT, refresh tokens, guards, or verification flows to
// preserve. This empty shell gives future projects the correct boundary without
// pretending that a partial auth implementation is production-ready.
@Module({
  imports: [UsersModule],
})
export class AuthModule {}
