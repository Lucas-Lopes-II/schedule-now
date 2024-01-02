import { randomUUID } from 'node:crypto';
import { User } from '@users/domain/entities';
import { IHasher } from '@shared/infra/crypto';
import { UserDataBuilder } from '@users/tests/mock';
import { BadRequestError } from '@shared/domain/errors';
import { CreateUserUseCase } from '@users/application/usescases';

describe('CreateUserUseCase unit tests', () => {
  const mockedInput: CreateUserUseCase.Input = {
    name: 'test',
    email: 'test@example.com',
    password: 'Test@123',
    actionDoneBy: randomUUID(),
  };
  const mockedOutput: CreateUserUseCase.Output = {
    id: randomUUID(),
    name: mockedInput.name,
    email: mockedInput.email,
  };
  const mockedUser = UserDataBuilder({ ...mockedOutput });

  let sut: CreateUserUseCase.UseCase;
  let mockedUserWritingRepo: User.IWritingRepo;
  let mockedUserReadingRepo: User.IReadingRepo;
  let mockedHasher: IHasher;

  beforeEach(() => {
    mockedUserWritingRepo = {
      create: jest.fn().mockResolvedValue(mockedUser),
    } as any as User.IWritingRepo;
    mockedUserReadingRepo = {
      emailExists: jest.fn().mockResolvedValue(false),
    } as any as User.IReadingRepo;
    mockedHasher = {
      hash: jest.fn().mockResolvedValue('hashed value'),
    } as any as IHasher;
    sut = new CreateUserUseCase.UseCase(
      mockedUserWritingRepo,
      mockedUserReadingRepo,
      mockedHasher,
    );
  });

  it('should create an user', async () => {
    const result = await sut.execute(mockedInput);

    expect(result).toStrictEqual(mockedOutput);
  });

  it('should thow a BadRequestError if userReadingRepo.emailExists return true', async () => {
    jest
      .spyOn(mockedUserReadingRepo, 'emailExists')
      .mockResolvedValueOnce(true);

    expect(sut.execute(mockedInput)).rejects.toThrow(
      new BadRequestError('email already exists'),
    );
  });

  it('should throw if userReadingRepo.emailExists throws', async () => {
    jest
      .spyOn(mockedUserReadingRepo, 'emailExists')
      .mockImplementationOnce(() => {
        throw new Error('');
      });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if hasher.hash throws', async () => {
    jest.spyOn(mockedHasher, 'hash').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });

  it('should throw if userWritingRepo.create throws', async () => {
    jest.spyOn(mockedUserWritingRepo, 'create').mockImplementationOnce(() => {
      throw new Error('');
    });

    expect(sut.execute(mockedInput)).rejects.toThrow();
  });
});
