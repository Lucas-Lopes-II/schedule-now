import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvConfig } from '@shared/infra/env';
import { dataSource } from '@shared/infra/database';
import { globalExeptionFiltersFactory } from '@shared/infra/exception-filters';

const envConfig = new EnvConfig();

async function bootstrap() {
  await dataSource
    .initialize()
    .then(async () => {
      console.log('Connection initialized with database...');
    })
    .catch((error) => console.log(error));

  const app = await NestFactory.create(AppModule);
  globalExeptionFiltersFactory(app);

  await app.listen(envConfig.getAppPort() || 3001);
}
bootstrap();
