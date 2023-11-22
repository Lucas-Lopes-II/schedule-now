import { IEntity } from '@shared/domain/entities';

export namespace User {
  export interface Interface extends IEntity {
    name: string;
    email: string;
  }

  export const create = (data: Interface): Interface => {
    return data;
  };
}
