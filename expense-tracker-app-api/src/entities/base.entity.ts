import {
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
