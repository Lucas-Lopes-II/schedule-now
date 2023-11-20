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
});
