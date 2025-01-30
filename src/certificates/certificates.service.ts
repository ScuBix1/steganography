import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { Repository } from 'typeorm';
import { Image } from 'src/images/entities/image.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    private jwtService: JwtService,
  ) {}
  async create(image: Image, message: string, user: User) {
    try {
      const payload = {message, id: user}
      const newCertificate = this.certificateRepository.create({
        image,
        createdAt: new Date(),
        token: this.jwtService.sign(payload, {noTimestamp: true})
      });
      return await this.certificateRepository.save(newCertificate);
    } catch (err) {
      throw new BadRequestException('Problème avec le certificat');
    }
  }
}
