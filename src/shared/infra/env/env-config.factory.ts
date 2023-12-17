import { EnvConfig, IEnvConfig } from '@shared/infra/env';

export const envConfigFactory = (): IEnvConfig => {
  return new EnvConfig();
};
