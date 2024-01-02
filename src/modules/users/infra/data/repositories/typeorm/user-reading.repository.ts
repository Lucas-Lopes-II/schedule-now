import { User } from '@users/domain/entities';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@users/infra/data/entities';

export class UserReadingRepo implements User.IReadingRepo {
  public static instance: UserReadingRepo | null = null;
  public userRepo: Repository<UserEntity>;

  private constructor(protected readonly dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(UserEntity);
  }

  public static createInstance(dataSource: DataSource): UserReadingRepo {
    if (!UserReadingRepo.instance) {
      UserReadingRepo.instance = new UserReadingRepo(dataSource);
    }

    return this.instance;
  }

  public async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email: email } });

    return !!user;
  }
}
