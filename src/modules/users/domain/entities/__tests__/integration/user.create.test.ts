import { User } from '@users/domain/entities';
import { IHasher } from '@shared/infra/crypto';
import { UserDataBuilder } from '@users/tests/mock';
import { BadRequestError } from '@shared/domain/errors';

describe('User.create - intregration testes', () => {
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

  describe('id validation', () => {
    it('should throw a BadRequestError when the given id is not provided', async () => {
      data.id = null;
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`id is required`));
    });

    it('should thow a BadRequestError if ReadingRepo.emailExists return true', async () => {
      jest.spyOn(mockedReadingRepo, 'emailExists').mockResolvedValueOnce(true);

      await expect(
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError('email already exists'));
    });

    it('should throw if ReadingRepo.emailExists throws', async () => {
      jest
        .spyOn(mockedReadingRepo, 'emailExists')
        .mockImplementationOnce(() => {
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

    it('should throw a BadRequestError when the given id is invalid', async () => {
      data.id = '59d4c26f-0487-4772-ac03-2171ffee62e';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`id in invalid format`));

      data.id = '9d4c26f-0487-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`id in invalid format`));

      data.id = '59d4c26f-0487-4772-ac0-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`id in invalid format`));

      data.id = '59d4c26f-0487-477-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`id in invalid format`));

      data.id = '59d4c26f-048-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`id in invalid format`));
    });
  });

  describe('name validation', () => {
    it('should throw a BadRequestError when the given name is not provided', async () => {
      data.name = null;
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`name is required`));
    });

    it('should throw a BadRequestError when the given name is too large', async () => {
      data.name = 'test'.repeat(26);

      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(
        new BadRequestError(
          `name must contain a maximum of 100 characters`.trim(),
        ),
      );
    });

    it('should throw a BadRequestError when the given name is too small', async () => {
      data.name = 't';

      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(
        new BadRequestError(`name must contain at least 2 characters`.trim()),
      );
    });
  });

  describe('email validation', () => {
    it('should throw a BadRequestError when the given email is not provided', async () => {
      data.email = null;
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`email is required`));
    });

    it('should throw a BadRequestError when the given email is too large', async () => {
      data.email = 'test'.repeat(26);

      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(
        new BadRequestError(
          `email must contain a maximum of 100 characters`.trim(),
        ),
      );
    });

    it('should throw a BadRequestError when the given email is too small', async () => {
      data.email = 't';

      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(
        new BadRequestError(`email must contain at least 7 characters`.trim()),
      );
    });
  });

  describe('password validation', () => {
    it('should throw a BadRequestError when the given password is not provided', async () => {
      data.password = null;
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`password is required`));
    });

    it('should throw a BadRequestError when the given password is weak', async () => {
      data.password = 'test@123';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`weak password`));

      data.password = 'Test@sd';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`weak password`));

      data.password = 'test123';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`weak password`));

      data.password = 'Ts@13';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`weak password`));

      data.password = 'T12@123';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`weak password`));

      data.password = '*#¨%@!"';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`weak password`));
    });
  });

  describe('createdBy validation', () => {
    it('should not throw an error when the given createdBy is provided correctly', async () => {
      data.createdBy = 'c0a55fe5-4f71-4088-b6ce-dd494f1a75f0';

      expect(
        async () =>
          await sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).not.toThrow();
    });

    it('should throw a BadRequestError when the given createdBy is invalid', async () => {
      data.createdBy = '59d4c26f-0487-4772-ac03-2171ffee62e';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`createdBy in invalid format`));

      data.createdBy = '9d4c26f-0487-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`createdBy in invalid format`));

      data.createdBy = '59d4c26f-0487-4772-ac0-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`createdBy in invalid format`));

      data.createdBy = '59d4c26f-0487-477-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`createdBy in invalid format`));

      data.createdBy = '59d4c26f-048-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`createdBy in invalid format`));
    });
  });

  describe('deletedBy validation', () => {
    it('should not throw an error when the given deletedBy is provided correctly', async () => {
      data.deletedBy = 'c0a55fe5-4f71-4088-b6ce-dd494f1a75f0';

      expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).not.toThrow();
    });

    it('should throw a BadRequestError when the given deletedBy is invalid', async () => {
      data.deletedBy = '59d4c26f-0487-4772-ac03-2171ffee62e';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`deletedBy in invalid format`));

      data.deletedBy = '9d4c26f-0487-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`deletedBy in invalid format`));

      data.deletedBy = '59d4c26f-0487-4772-ac0-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`deletedBy in invalid format`));

      data.deletedBy = '59d4c26f-0487-477-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`deletedBy in invalid format`));

      data.deletedBy = '59d4c26f-048-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`deletedBy in invalid format`));
    });
  });

  describe('updatedBy validation', () => {
    it('should not throw an error when the given updatedBy is provided correctly', async () => {
      data.updatedBy = 'c0a55fe5-4f71-4088-b6ce-dd494f1a75f0';

      expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).not.toThrow();
    });

    it('should throw a BadRequestError when the given updatedBy is invalid', async () => {
      data.updatedBy = '59d4c26f-0487-4772-ac03-2171ffee62e';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`updatedBy in invalid format`));

      data.updatedBy = '9d4c26f-0487-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`updatedBy in invalid format`));

      data.updatedBy = '59d4c26f-0487-4772-ac0-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`updatedBy in invalid format`));

      data.updatedBy = '59d4c26f-0487-477-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`updatedBy in invalid format`));

      data.updatedBy = '59d4c26f-048-4772-ac03-2171ffee62e1';
      await expect(() =>
        sut(data, mockedWritingRepo, mockedReadingRepo, mockedHasher),
      ).rejects.toThrow(new BadRequestError(`updatedBy in invalid format`));
    });
  });
});
