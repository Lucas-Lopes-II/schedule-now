import { Validation } from './validation.inteface';
import { BadRequestError } from '@shared/domain/errors';

export class MaxValueFieldValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly maxValue: number,
  ) {}

  validate(input: T): void {
    const value = input[this.fieldName] as number;

    if (typeof value !== 'number') {
      throw new BadRequestError(`${this.fieldName as any} must be a number`);
    }

    if (value > this.maxValue) {
      throw new BadRequestError(
        `${this.fieldName as any} must be at most ${this.maxValue}`.trim(),
      );
    }
  }
}
