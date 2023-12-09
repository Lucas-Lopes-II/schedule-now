import { Validator } from './validator';
import { Validation } from './validation.inteface';
import { BadRequestError } from '@shared/domain/errors';

export class EmailValidation<T = any> implements Validation<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): void {
    const isValid = Validator.isEmail(input[this.fieldName as string]);

    if (!isValid) {
      throw new BadRequestError(
        `${this.fieldName as string} in invalid format`,
      );
    }
  }
}
