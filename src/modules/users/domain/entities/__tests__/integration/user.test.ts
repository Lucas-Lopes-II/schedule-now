import { randomUUID } from 'crypto';
import { User } from '@users/domain/entities';
import { BadRequestError } from '@shared/domain/errors';

describe('User', () => {
  let sut: (data: User.Interface) => User.Interface;
  let data: User.Interface;

  beforeEach(() => {
    sut = User.create;
    data = {
      id: randomUUID(),
      name: 'test',
      email: 'test@example.com',
      password: 'Test@123',
    };
  });

  it('should create an user', () => {
    const result = sut(data);

    expect(result).toStrictEqual(data);
  });

  describe('id validation', () => {
    it('should throw a BadRequestError when the given id is invalid', async () => {
      data.id = '59d4c26f-0487-4772-ac03-2171ffee62e';
      expect(() => sut(data)).toThrow(
        new BadRequestError(`id in invalid format`),
      );

      data.id = '9d4c26f-0487-4772-ac03-2171ffee62e1';
      expect(() => sut(data)).toThrow(
        new BadRequestError(`id in invalid format`),
      );

      data.id = '59d4c26f-0487-4772-ac0-2171ffee62e1';
      expect(() => sut(data)).toThrow(
        new BadRequestError(`id in invalid format`),
      );

      data.id = '59d4c26f-0487-477-ac03-2171ffee62e1';
      expect(() => sut(data)).toThrow(
        new BadRequestError(`id in invalid format`),
      );

      data.id = '59d4c26f-048-4772-ac03-2171ffee62e1';
      expect(() => sut(data)).toThrow(
        new BadRequestError(`id in invalid format`),
      );
    });
  });

  describe('name validation', () => {
    it('should throw a BadRequestError when the given name is too large', async () => {
      data.name = 'test'.repeat(26);

      expect(() => sut(data)).toThrow(
        new BadRequestError(
          `name must contain a maximum of 100 characters`.trim(),
        ),
      );
    });

    it('should throw a BadRequestError when the given name is too small', async () => {
      data.name = 't';

      expect(() => sut(data)).toThrow(
        new BadRequestError(`name must contain at least 2 characters`.trim()),
      );
    });
  });

  describe('email validation', () => {
    it('should throw a BadRequestError when the given email is too large', async () => {
      data.email = 'test'.repeat(26);

      expect(() => sut(data)).toThrow(
        new BadRequestError(
          `email must contain a maximum of 100 characters`.trim(),
        ),
      );
    });

    it('should throw a BadRequestError when the given email is too small', async () => {
      data.email = 't';

      expect(() => sut(data)).toThrow(
        new BadRequestError(`email must contain at least 7 characters`.trim()),
      );
    });
  });

  describe('password validation', () => {
    it('should throw a BadRequestError when the given password is weak', async () => {
      data.password = 'test@123';
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = 'Test@sd';
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = 'test123';
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = 'Ts@13';
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = 'T12@123';
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = '*#¨%@!"';
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = undefined;
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = null;
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = '';
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));

      data.password = 0 as any;
      expect(() => sut(data)).toThrow(new BadRequestError(`weak password`));
    });
  });
});
