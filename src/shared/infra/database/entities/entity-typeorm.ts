import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IEntity } from '@shared/domain/entities';

export class EntityTypeOrm implements IEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt?: Date;

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt?: Date;

  @Column({ nullable: true, name: 'created_by' })
  createdBy?: string;

  @Column({ nullable: true, name: 'updated_by' })
  updatedBy?: string;

  @Column({ nullable: true, name: 'deleted_by' })
  deletedBy?: string;

  @Column({ nullable: true })
  status?: string;
}
