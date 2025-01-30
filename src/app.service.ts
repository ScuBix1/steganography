import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { User } from './users/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './images/entities/image.entity';
import { Certificate } from './certificates/entities/certificate.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async getAllUsersWithDetails(user: User): Promise<User[]> {
    if (user.admin) {
      return await this.userRepository.find({
        relations: ['images'],
      });
    } else {
      throw new UnauthorizedException("Vous n'êtes pas administrateur!");
    }
  }

  async deleteUser(userId: UUID, requestingUser: User): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['images'],
    });
    if (!user) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${userId} non trouvé.`,
      );
    }

    const image = await this.imageRepository.findOne({
      where: { owner: user },
      relations: ['certificate', 'user'],
    });
    if (!image) {
      throw new NotFoundException(`l'Image n'a pas été trouvé.`);
    }

    const certificate = await this.certificateRepository.findOne({
      where: { image: image },
      relations: ['images'],
    });
    if (!certificate) {
      throw new NotFoundException(`Le certificat n'a pas été trouvé.`);
    }
    if (!requestingUser.admin) {
      throw new UnauthorizedException(
        'Seuls les administrateurs peuvent supprimer un utilisateur.',
      );
    }
    await this.certificateRepository.delete(certificate);
    await this.imageRepository.delete(image);

    await this.userRepository.delete(user);

    return `L'utilisateur ${user.firstName} ${user.lastName} a été supprimé avec succès.`;
  }

  async getAllUser(user: User): Promise<User[]> {
    if (user.admin) {
      return await this.userRepository.find();
    } else {
      throw new UnauthorizedException("Vous n'êtes pas administrateur!");
    }
  }
}
