import { IEntity } from '@shared/domain/entities';
import { Validation } from '@shared/domain/validations';
import { createUserValidatorFactory } from '@users/domain/factories';

export namespace User {
  export interface Interface extends IEntity {
    name: string;
    email: string;
    password: string;
  }

  export const create = (data: Interface): Interface => {
    const validator: Validation = createUserValidatorFactory();
    validator.validate(data);

    return data;
  };
}
