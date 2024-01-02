import { User } from '@users/domain/entities';
import { DataSource, Repository } from 'typeorm';
import { UserDataBuilder } from '@users/tests/mock';
import { UserEntity } from '@users/infra/data/entities';
import { UserReadingRepo } from '@users/infra/data/repositories';

describe('UserReadingRepo unit tests', () => {
  let mockedUserRepo: Repository<UserEntity>;
  let mockDataSource: DataSource;
  let sut: User.IReadingRepo;

  const mockedUser = UserDataBuilder({});

  beforeEach(() => {
    mockedUserRepo = {
      findOne: jest.fn().mockResolvedValue(mockedUser),
    } as any as Repository<UserEntity>;
    mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockedUserRepo),
    } as any as DataSource;
  });

  afterEach(() => {
    UserReadingRepo.instance = null;
  });

  it(`the sut and mockDataSource should be defined`, () => {
    sut = UserReadingRepo.createInstance(mockDataSource);

    expect(sut).toBeDefined();
    expect(mockDataSource).toBeDefined();
  });

  describe('createInstance', () => {
    it(`should create an instance correctly`, async () => {
      expect(UserReadingRepo.instance).toBeNull();

      sut = UserReadingRepo.createInstance(mockDataSource);

      expect(UserReadingRepo.instance).toStrictEqual(sut);
      expect(UserReadingRepo.instance).toBeInstanceOf(UserReadingRepo);
    });
  });

  describe('emailExists', () => {
    const email = 'user@example.com';
    it(`should retrun true if find one user with the given email`, async () => {
      sut = UserReadingRepo.createInstance(mockDataSource);
      const result = await sut.emailExists(email);

      expect(result).toBeTruthy();
      expect(mockedUserRepo.findOne).toHaveBeenCalledWith({
        where: { email: 'user@example.com' },
      });
    });

    it(`should retrun false if don't find one user with the given email`, async () => {
      sut = UserReadingRepo.createInstance(mockDataSource);
      jest.spyOn(mockedUserRepo, 'findOne').mockResolvedValueOnce(null);
      const result = await sut.emailExists(email);

      expect(result).toBeFalsy();
    });

    it(`should throw if userRepo.findOne throws`, async () => {
      sut = UserReadingRepo.createInstance(mockDataSource);
      jest.spyOn(mockedUserRepo, 'findOne').mockImplementationOnce(() => {
        throw new Error('');
      });

      await expect(async () => sut.emailExists(email)).rejects.toThrow();
    });
  });
});
