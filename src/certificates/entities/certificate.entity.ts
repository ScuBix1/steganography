import { UUID } from 'crypto';
import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: UUID;

  @OneToOne(() => Image, (image) => image.certificate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'imageId' })
  image: Image;

  @Column()
  token: string; 

  @CreateDateColumn()
  createdAt: Date;
}