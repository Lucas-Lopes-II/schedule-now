import { DataSource, DataSourceOptions } from 'typeorm';
import { IEnvConfig, envConfigFactory } from '@shared/infra/env';

const envConfig: IEnvConfig = envConfigFactory();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.getDbHost(),
  port: envConfig.getDBPort(),
  username: envConfig.getDbUserName(),
  password: envConfig.getDbPassword(),
  database: envConfig.getDbName(),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/modules/shared/infra/database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
