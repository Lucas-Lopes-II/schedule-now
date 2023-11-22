import { Module } from '@nestjs/common';
import { UsersController } from '@users/infra/main';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
