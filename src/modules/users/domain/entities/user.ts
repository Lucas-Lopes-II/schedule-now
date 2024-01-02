/* eslint-disable @typescript-eslint/no-empty-interface */
import { IHasher } from '@shared/infra/crypto';
import { IEntity } from '@shared/domain/entities';
import { BadRequestError } from '@shared/domain/errors';
import { Validation } from '@shared/domain/validations';
import { Create, IEmailExists } from '@shared/infra/repositories';
import { createUserValidatorFactory } from '@users/domain/factories';

export namespace User {
  export interface Interface extends IEntity {
    name: string;
    email: string;
    password: string;
  }

  export interface IReadingRepo extends IEmailExists {}
  export interface IWritingRepo<E = User.Interface> extends Create<E, E> {}

  export const create = async (
    data: Interface,
    writingRepo: IWritingRepo,
    readingRepo: IReadingRepo,
    hasher: IHasher,
  ): Promise<Interface> => {
    const emailInUse = await readingRepo.emailExists(data.email);
    if (emailInUse) {
      throw new BadRequestError('email already exists');
    }

    const validator: Validation = createUserValidatorFactory();
    validator.validate(data);
    const hashedPassword = await hasher.hash(data.password);
    const createdUser = await writingRepo.create({
      ...data,
      password: hashedPassword,
    });

    return createdUser;
  };
}
