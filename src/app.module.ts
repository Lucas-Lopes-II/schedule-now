import { Module } from '@nestjs/common';
import { UsersModule } from '@users/infra/main';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
