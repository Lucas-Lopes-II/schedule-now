import { User } from '@users/domain/entities';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@users/infra/data/entities';
import { IUserWritingRepo } from '@users/infra/data/repositories';

export class UserWritingRepo implements IUserWritingRepo<UserEntity> {
  public static instance: UserWritingRepo | null = null;
  public userRepo: Repository<UserEntity>;

  private constructor(protected readonly dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(UserEntity);
  }

  public static createInstance(dataSource: DataSource): UserWritingRepo {
    if (!UserWritingRepo.instance) {
      UserWritingRepo.instance = new UserWritingRepo(dataSource);
    }

    return this.instance;
  }

  public create(
    data: User.Interface,
    actionDoneBy?: string,
  ): Promise<UserEntity> {
    const createdEntity = this.userRepo.create({
      ...data,
      createdBy: actionDoneBy,
    });

    return this.userRepo.save(createdEntity);
  }
}
