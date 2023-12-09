import { randomUUID } from 'crypto';
import { User } from '@users/domain/entities';

describe('User', () => {
  const sut = User.create;

  it('should create an user', () => {
    const data: User.Interface = {
      id: randomUUID(),
      name: 'test',
      email: 'test@example.com',
      password: 'test_password',
    };
    const result = sut(data);

    expect(result).toStrictEqual(data);
  });
});
