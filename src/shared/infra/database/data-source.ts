import { DataSource, DataSourceOptions } from 'typeorm';
import { EnvConfig, IEnvConfig } from '@shared/infra/env';

const envConfig: IEnvConfig = new EnvConfig();
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
