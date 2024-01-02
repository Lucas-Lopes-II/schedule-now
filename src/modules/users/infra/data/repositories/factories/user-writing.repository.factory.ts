import { User } from '@users/domain/entities';
import { dataSource } from '@shared/infra/database';
import { UserWritingRepo } from '@users/infra/data/repositories';

export const userWritingRepositoryFactory = (): User.IWritingRepo => {
  return UserWritingRepo.createInstance(dataSource);
};
