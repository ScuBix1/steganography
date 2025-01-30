import { UUID } from 'crypto';
import { Certificate } from 'src/certificates/entities/certificate.entity';
import { Image } from 'src/images/entities/image.entity';
import { Verification } from 'src/verifications/entities/verification.entity';
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
