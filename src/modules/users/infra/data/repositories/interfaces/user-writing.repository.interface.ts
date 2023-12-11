import { User } from '@users/domain/entities';
import { Create } from '@shared/infra/repositories';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserWritingRepo<E = User.Interface> extends Create<E, E> {}
