import { randomUUID } from 'node:crypto';
import { UserDataBuilder } from '@users/tests/mock';
import { CreateUserUseCase } from '@users/application/usescases';
import { IUserWritingRepo } from '@users/infra/data/repositories';

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

  beforeEach(() => {
    mockedUserWritingRepo = {
      create: jest.fn().mockResolvedValue(mockedUser),
    } as any as IUserWritingRepo;
    sut = new CreateUserUseCase.UseCase(mockedUserWritingRepo);
  });

  it('should create an user', async () => {
    const result = await sut.execute(mockedInput);

    expect(result).toStrictEqual(mockedOutput);
  });
});
