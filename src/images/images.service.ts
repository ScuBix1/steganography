import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async create(file: Express.Multer.File, user: User) {
    try {
      const newImage = this.imageRepository.create({
        originalPath: `/src/assets/${file.originalname}`,
        modifiedPath: `/src/assets/modified-${file.originalname}`,
        createdAt: new Date(),
        owner: user,
        count: 0,
      });
      return await this.imageRepository.save(newImage);
    } catch (err) {
      throw new BadRequestException('Problème avec le fichier');
    }
  }
}
