import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Image, (image) => image.verifications, { onDelete: 'CASCADE' })
  image: Image;

  @Column({ default: 1 })
  count: number;

  @UpdateDateColumn()
  lastChecked: Date;
}
