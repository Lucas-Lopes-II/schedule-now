export interface IEntity {
  id: string;
  deletedAt?: Date;
  createdAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  status?: string;
}
