import { IEnvConfig } from './env-config.interface';
import { config } from 'dotenv';

config();

export class EnvConfig implements IEnvConfig {
  getAppPort(): number {
    return Number(process.env.PORT);
  }

  getNodeEnv(): string {
    return process.env.NODE_ENV.toString();
  }

  getDbHost(): string {
    return process.env.DATABASE_HOST.toString();
  }

  getDBPort(): number {
    return Number(process.env.DATABASE_PORT);
  }

  getDbUserName(): string {
    return process.env.DATABASE_USER_NAME.toString();
  }

  getDbPassword(): string {
    return process.env.DATABASE_PASSWORD.toString();
  }

  getDbName(): string {
    return process.env.DATABASE_NAME.toString();
  }
}
