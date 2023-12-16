import { randomUUID } from 'node:crypto';
import { User } from '@users/domain/entities';
import { DefaultUseCase } from '@shared/application/usecases';
import { IUserWritingRepo } from '@users/infra/data/repositories';

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
    constructor(private readonly userWritingRepo: IUserWritingRepo) {}

    async execute({
      name,
      email,
      password,
      actionDoneBy,
    }: Input): Promise<Output> {
      const id = randomUUID();
      const createdUser = User.create({
        id,
        name,
        email,
        password,
        actionDoneBy,
      } as User.Interface);
      const savedUser = await this.userWritingRepo.create(createdUser);

      return {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      };
    }
  }
}
