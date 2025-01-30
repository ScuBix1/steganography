import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate]), JwtModule.register({})],
  exports: [CertificatesService],
  controllers: [CertificatesController],
  providers: [CertificatesService],
})
export class CertificatesModule {}
