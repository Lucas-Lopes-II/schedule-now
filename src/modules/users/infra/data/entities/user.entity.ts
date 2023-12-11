import { Column, Entity } from 'typeorm';
import { User } from '@users/domain/entities';
import { EntityTypeOrm } from '@shared/infra/database/entities';

@Entity('users')
export class UserEntity extends EntityTypeOrm implements User.Interface {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;
}
