import { randomUUID } from 'node:crypto';
import { User } from '@users/domain/entities';
import { IHasher } from '@shared/infra/crypto';
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
      private readonly userWritingRepo: User.IWritingRepo,
      private readonly userReadingRepo: User.IReadingRepo,
      private readonly hasher: IHasher,
    ) {}

    async execute({
      name,
      email,
      password,
      actionDoneBy,
    }: Input): Promise<Output> {
      const id = randomUUID();
      const createdUser = await User.create(
        {
          id,
          name,
          email,
          password,
          actionDoneBy,
        } as User.Interface,
        this.userWritingRepo,
        this.userReadingRepo,
        this.hasher,
      );

      return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };
    }
  }
}
