import { Validation } from './validation.inteface';
import { BadRequestError } from '@shared/domain/errors';

export class MinLengthFieldValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly minLength: number,
  ) {}

  validate(input: T): void {
    const value = input[this.fieldName] as string;

    if (typeof value !== 'string') {
      throw new BadRequestError(`${this.fieldName as any} must be a string`);
    }

    if (value.length < this.minLength) {
      throw new BadRequestError(
        `${this.fieldName as any} must contain at least ${
          this.minLength
        } characters`.trim(),
      );
    }
  }
}
