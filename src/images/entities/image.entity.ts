import { UUID } from "crypto";
import { Certificate } from "src/certificates/entities/certificate.entity";
import { User } from "src/users/users.entity";
import { Verification } from "src/verifications/entities/verification.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  originalPath: string;

  @Column()
  modifiedPath: string;

  @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
  owner: User;

  @OneToOne(() => Certificate, (certificate) => certificate.image, { cascade: true })
  certificate: Certificate;

  @OneToMany(() => Verification, (verification) => verification.image)
  verifications: Verification[];

  @CreateDateColumn()
  createdAt: Date;
}
