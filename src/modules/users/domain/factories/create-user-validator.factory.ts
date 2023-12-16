import { User } from '../entities';
import {
  MaxLengthFieldValidation,
  MinLengthFieldValidation,
  UUIDValidation,
  Validation,
  ValidationComposite,
  StrongPasswordValidation,
} from '@shared/domain/validations';

export const createUserValidatorFactory = () => {
  const validations: Validation<User.Interface>[] = [
    new UUIDValidation('id'),
    new MinLengthFieldValidation('name', 2),
    new MaxLengthFieldValidation('name', 100),
    new MinLengthFieldValidation('email', 7),
    new MaxLengthFieldValidation('email', 100),
    new StrongPasswordValidation('password'),
    new UUIDValidation('createdBy', false),
    new UUIDValidation('deletedBy', false),
    new UUIDValidation('updatedBy', false),
  ];

  return new ValidationComposite(validations);
};
