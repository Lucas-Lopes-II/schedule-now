import { Bcrypt, IHasher } from '@shared/infra/crypto';

export const bcryptFactory = (): IHasher => {
  return new Bcrypt();
};
