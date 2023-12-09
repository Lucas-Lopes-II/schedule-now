import { BadRequestError } from '@shared/domain/errors';
import { EmailValidation, Validation } from '@shared/domain/validations';

describe('EmailValidation integration tests', () => {
  let sut: Validation;
  const dataValidate = {
    email: 'tes@tes.com',
  };

  beforeEach(() => {
    sut = new EmailValidation('email');
  });

  it('should vailidate correctly', async () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();

    dataValidate.email = 'l@l.com';
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given email is invalid', async () => {
    dataValidate.email = 'qwewe';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`email in invalid format`),
    );

    dataValidate.email = 'test@';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`email in invalid format`),
    );

    dataValidate.email = '@test';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`email in invalid format`),
    );

    dataValidate.email = 'test@test';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`email in invalid format`),
    );

    dataValidate.email = 'test@.com';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`email in invalid format`),
    );

    dataValidate.email = '@test.com';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`email in invalid format`),
    );

    dataValidate.email = 'test.com';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`email in invalid format`),
    );
  });
});
