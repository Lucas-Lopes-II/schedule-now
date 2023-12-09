import { Validation } from './validation.inteface';
import { BadRequestError } from '@shared/domain/errors';

export class MaxLengthFieldValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly maxLength: number,
  ) {}

  validate(input: T): void {
    const value = input[this.fieldName] as string;

    if (typeof value !== 'string') {
      throw new BadRequestError(`${this.fieldName as any} must be a string`);
    }

    if (value.length > this.maxLength) {
      throw new BadRequestError(
        `${this.fieldName as any} must contain a maximum of ${
          this.maxLength
        } characters`.trim(),
      );
    }
  }
}
