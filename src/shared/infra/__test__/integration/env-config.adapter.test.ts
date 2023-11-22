import { EnvConfig, IEnvConfig } from '@shared/infra/env';

describe('EnvConfig integration tests', () => {
  let sut: IEnvConfig;

  beforeEach(() => {
    sut = new EnvConfig();
  });

  it('should return the enviroment PORT', async () => {
    const result = sut.getAppPort();

    expect(result).toStrictEqual(3001);
  });

  it('should return the enviroment NODE_ENV', async () => {
    const result = sut.getNodeEnv();

    expect(result).toStrictEqual('test');
  });

  it('should return the enviroment DATABASE_HOST', async () => {
    const result = sut.getDbHost();

    expect(result).toStrictEqual('localhost');
  });

  it('should return the enviroment DATABASE_PORT', async () => {
    const result = sut.getDBPort();

    expect(result).toStrictEqual(5432);
  });

  it('should return the enviroment DATABASE_USER_NAME', async () => {
    const result = sut.getDbUserName();

    expect(result).toStrictEqual('postgres');
  });

  it('should return the enviroment DATABASE_PASSWORD', async () => {
    const result = sut.getDbPassword();

    expect(result).toStrictEqual('docker');
  });

  it('should return the enviroment DATABASE_NAME', async () => {
    const result = sut.getDbName();

    expect(result).toStrictEqual('schedule-test');
  });
});
