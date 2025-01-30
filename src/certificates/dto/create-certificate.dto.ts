import { Image } from "src/images/entities/image.entity";

export class CreateCertificateDto {
    image: Image;
    token: string;
    createdAt: Date;
}
