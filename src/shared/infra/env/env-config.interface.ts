export abstract class IEnvConfig {
  abstract getAppPort(): number;
  abstract getNodeEnv(): string;
  abstract getDbHost(): string;
  abstract getDBPort(): number;
  abstract getDbUserName(): string;
  abstract getDbPassword(): string;
  abstract getDbName(): string;
}
