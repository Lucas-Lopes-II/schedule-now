import {
  IUserReadingRepo,
  IUserWritingRepo,
} from '@users/infra/data/repositories';
import { randomUUID } from 'node:crypto';
import { User } from '@users/domain/entities';
import { IHasher } from '@shared/infra/crypto';
import { BadRequestError } from '@shared/domain/errors';
import { DefaultUseCase } from '@shared/application/usecases';

export namespace CreateUserUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
    actionDoneBy: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userWritingRepo: IUserWritingRepo,
      private readonly userReadingRepo: IUserReadingRepo,
      private readonly hasher: IHasher,
    ) {}

    async execute({
      name,
      email,
      password,
      actionDoneBy,
    }: Input): Promise<Output> {
      const emailInUse = await this.userReadingRepo.emailExists(email);
      if (emailInUse) {
        throw new BadRequestError('email already exists');
      }

      const id = randomUUID();
      const createdUser = User.create({
        id,
        name,
        email,
        password,
        actionDoneBy,
      } as User.Interface);
      const hashedPassword = await this.hasher.hash(password);
      const savedUser = await this.userWritingRepo.create({
        ...createdUser,
        password: hashedPassword,
      });

      return {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      };
    }
  }
}
