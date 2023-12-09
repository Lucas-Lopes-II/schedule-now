import { Validator } from './validator';
import { Validation } from './validation.inteface';
import { BadRequestError } from '@shared/domain/errors';

export class StrongPasswordValidation<T = any> implements Validation<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): void {
    const isValid = Validator.isStrongPassword(input[this.fieldName as string]);

    if (!isValid) {
      throw new BadRequestError(`weak ${this.fieldName as string}`);
    }
  }
}
