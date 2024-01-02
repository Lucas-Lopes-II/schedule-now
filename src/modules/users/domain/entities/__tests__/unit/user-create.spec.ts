import { User } from '@users/domain/entities';
import { IHasher } from '@shared/infra/crypto';
import { UserDataBuilder } from '@users/tests/mock';
import { BadRequestError } from '@shared/domain/errors';

describe('User.create - unit tests', () => {
  let sut: (
    data: User.Interface,
    writingRepo: User.IWritingRepo,
    readingRepo: User.IReadingRepo,
    hasher: IHasher,
  ) => Promise<User.Interface>;
  let data: User.Interface;
  let mockedWritingRepo: User.IWritingRepo;
  let mockedReadingRepo: User.IReadingRepo;
  let mockedHasher: IHasher;

  beforeEach(() => {
    data = UserDataBuilder({
      id: 'c0a55fe5-4f71-4088-b6ce-dd494f1a75f1',
      name: 'test',
      email: 'test@example.com',
      password: 'Test@123',
    });
    mockedWritingRepo = {
      create: jest.fn().mockResolvedValue(data),
    } as any as User.IWritingRepo;
    mockedReadingRepo = {
      emailExists: jest.fn().mockResolvedValue(false),
    } as any as User.IReadingRepo;
    mockedHasher = {
      hash: jest.fn().mockResolvedValue('hashed value'),
    } as any as IHasher;
    sut = User.create;
  });

  it('should create an user', async () => {
    const result = await sut(
      data,
      mockedWritingRepo,
      mockedReadingRepo,
      mockedHasher,
    );

    expect(result).toStrictEqual(data);
  });

  it('should thow a BadRequestError if readingRepo.emailExists return true', async () => {
    jest.spyOn(mockedReadingRepo, 'emailExists').mockResolvedValueOnce(true);

    await expect(
      sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
    ).rejects.toThrow(new BadRequestError('email already exists'));
  });

  it('should throw if readingRepo.emailExists throws', async () => {
    jest.spyOn(mockedReadingRepo, 'emailExists').mockImplementationOnce(() => {
      throw new Error('');
    });

    await expect(
      sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
    ).rejects.toThrow();
  });

  it('should throw if hasher.hash throws', async () => {
    jest.spyOn(mockedHasher, 'hash').mockImplementationOnce(() => {
      throw new Error('');
    });

    await expect(
      sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
    ).rejects.toThrow();
  });

  it('should throw if userWritingRepo.create throws', async () => {
    jest.spyOn(mockedWritingRepo, 'create').mockImplementationOnce(() => {
      throw new Error('');
    });

    await expect(
      sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
    ).rejects.toThrow();
  });
});
