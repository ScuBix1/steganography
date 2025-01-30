import { UUID } from 'crypto';
import { Image } from 'src/images/entities/image.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Image, (image) => image.owner)
  images: Image[];
}
