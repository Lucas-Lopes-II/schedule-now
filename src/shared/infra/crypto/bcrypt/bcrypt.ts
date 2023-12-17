import { hash, compare } from 'bcrypt';
import { IHasher } from '@shared/infra/crypto';

export class Bcrypt implements IHasher {
  public hash(data: string | Buffer): Promise<string> {
    return hash(data, 12);
  }

  public compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
