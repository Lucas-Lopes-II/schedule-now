import { faker } from '@faker-js/faker';
import { User } from '@users/domain/entities';

export function UserDataBuilder(
  props: Partial<User.Interface>,
): User.Interface {
  return {
    id: props.id || faker.string.uuid(),
    name: props.name || faker.commerce.productName(),
    email: props.email || faker.internet.email(),
    password: props.password || faker.string.uuid(),
    createdAt: props.createdAt || new Date(),
    createdBy: props.createdBy || faker.string.uuid(),
  };
}
