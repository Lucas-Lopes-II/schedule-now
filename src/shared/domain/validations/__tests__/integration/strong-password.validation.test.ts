import {
  StrongPasswordValidation,
  Validation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

describe('StrongPasswordValidation integration tests', () => {
  let sut: Validation;
  const dataValidate = {
    password: 'Test@123',
  };

  beforeEach(() => {
    sut = new StrongPasswordValidation('password');
  });

  it('should vailidate correctly', () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given password is weak', async () => {
    dataValidate.password = 'test@123';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = 'Test@sd';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = 'test123';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = 'Ts@13';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = 'T12@123';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = '*#¨%@!"';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = undefined;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = null;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = '';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );

    dataValidate.password = 0 as any;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`weak password`),
    );
  });
});
