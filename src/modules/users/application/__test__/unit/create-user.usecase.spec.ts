import { randomUUID } from 'node:crypto';
import { UserDataBuilder } from '@users/tests/mock';
import { CreateUserUseCase } from '@users/application/usescases';
import {
  IUserReadingRepo,
  IUserWritingRepo,
} from '@users/infra/data/repositories';
import { BadRequestError } from '@shared/domain/errors';

describe('CreateUserUseCase unit tests', () => {
  const mockedInput = {
    name: 'test',
    email: 'test@example.com',
    password: 'Test@123',
    actionDoneBy: randomUUID(),
  };
  const mockedOutput = {
    id: randomUUID(),
    name: mockedInput.name,
    email: mockedInput.email,
  };
  const mockedUser = UserDataBuilder({ ...mockedOutput });

  let sut: CreateUserUseCase.UseCase;
  let mockedUserWritingRepo: IUserWritingRepo;
  let mockedUserReadingRepo: IUserReadingRepo;

  beforeEach(() => {
    mockedUserWritingRepo = {
      create: jest.fn().mockResolvedValue(mockedUser),
    } as any as IUserWritingRepo;
    mockedUserReadingRepo = {
      emailExists: jest.fn().mockResolvedValue(false),
    } as any as IUserReadingRepo;
    sut = new CreateUserUseCase.UseCase(
      mockedUserWritingRepo,
      mockedUserReadingRepo,
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
});
