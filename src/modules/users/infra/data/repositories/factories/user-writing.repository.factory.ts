import {
  IUserWritingRepo,
  UserWritingRepo,
} from '@users/infra/data/repositories';
import { dataSource } from '@shared/infra/database';

export const userWritingRepositoryFactory = (): IUserWritingRepo => {
  return UserWritingRepo.createInstance(dataSource);
};
