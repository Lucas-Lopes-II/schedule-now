import { DataSource, Repository } from 'typeorm';
import {
  IUserWritingRepo,
  UserWritingRepo,
} from '@users/infra/data/repositories';
import { faker } from '@faker-js/faker';
import { UserEntity } from '@users/infra/data/entities';
import { UserDataBuilder } from '@users/tests/mock';

describe('UserWritingRepo unit tests', () => {
  let mockedUserRepo: Repository<UserEntity>;
  let mockDataSource: DataSource;
  let sut: IUserWritingRepo;

  const mockedUser = UserDataBuilder({});

  beforeEach(() => {
    mockedUserRepo = {
      create: jest.fn().mockReturnValue(mockedUser),
      save: jest.fn().mockResolvedValue(mockedUser),
    } as any as Repository<UserEntity>;
    mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockedUserRepo),
    } as any as DataSource;
  });

  afterEach(() => {
    UserWritingRepo.instance = null;
  });

  it(`the sut and mockDataSource should be defined`, () => {
    sut = UserWritingRepo.createInstance(mockDataSource);

    expect(sut).toBeDefined();
    expect(mockDataSource).toBeDefined();
  });

  describe('createInstance', () => {
    it(`should create an instance correctly`, async () => {
      expect(UserWritingRepo.instance).toBeNull();

      sut = UserWritingRepo.createInstance(mockDataSource);

      expect(UserWritingRepo.instance).toStrictEqual(sut);
      expect(UserWritingRepo.instance).toBeInstanceOf(UserWritingRepo);
    });
  });

  describe('create', () => {
    it(`should create an user`, async () => {
      sut = UserWritingRepo.createInstance(mockDataSource);
      const actionDoneBy = faker.string.uuid();
      const result = await sut.create(mockedUser, actionDoneBy);

      expect(result).toEqual(mockedUser);
      expect(mockedUserRepo.create).toHaveBeenCalledWith({
        ...mockedUser,
        createdBy: actionDoneBy,
      });
      expect(mockedUserRepo.save).toHaveBeenCalledWith(mockedUser);
    });

    it(`should throw if userRepo.create throws`, async () => {
      sut = UserWritingRepo.createInstance(mockDataSource);
      jest.spyOn(mockedUserRepo, 'create').mockImplementationOnce(() => {
        throw new Error('');
      });

      await expect(async () => sut.create(mockedUser)).rejects.toThrow();
    });

    it(`should throw if userRepo.save throws`, async () => {
      sut = UserWritingRepo.createInstance(mockDataSource);
      jest.spyOn(mockedUserRepo, 'save').mockImplementationOnce(() => {
        throw new Error('');
      });

      await expect(async () => sut.create(mockedUser)).rejects.toThrow();
    });
  });
});
