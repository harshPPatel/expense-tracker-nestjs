import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class Income extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ nullable: false })
  username: string;
}
