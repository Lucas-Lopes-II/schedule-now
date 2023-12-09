import { Validation } from './validation.inteface';
import { BadRequestError } from '@shared/domain/errors';

export class MinValueFieldValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly minValue: number,
  ) {}

  validate(input: T): void {
    const value = input[this.fieldName] as number;

    if (typeof value !== 'number') {
      throw new BadRequestError(`${this.fieldName as any} must be a number`);
    }

    if (value < this.minValue) {
      throw new BadRequestError(
        `${this.fieldName as any} must be at least ${this.minValue}`.trim(),
      );
    }
  }
}
