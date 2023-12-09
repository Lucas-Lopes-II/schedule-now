import { Validation } from './validation.inteface';
import { BadRequestError } from '@shared/domain/errors';

export class RequiredFieldValidation<T = any> implements Validation<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): void {
    if (!input[this.fieldName]) {
      throw new BadRequestError(`${this.fieldName as any} is required`);
    }
  }
}
