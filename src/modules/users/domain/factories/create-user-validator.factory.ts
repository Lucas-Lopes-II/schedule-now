import {
  MaxLengthFieldValidation,
  MinLengthFieldValidation,
  UUIDValidation,
  Validation,
  ValidationComposite,
  StrongPasswordValidation,
} from '@shared/domain/validations';
import { User } from '../entities';

export const createUserValidatorFactory = () => {
  const validations: Validation<User.Interface>[] = [
    new UUIDValidation('id'),
    new MinLengthFieldValidation('name', 2),
    new MaxLengthFieldValidation('name', 100),
    new MinLengthFieldValidation('email', 7),
    new MaxLengthFieldValidation('email', 100),
    new StrongPasswordValidation('password'),
  ];

  return new ValidationComposite(validations);
};
