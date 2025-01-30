import { Certificate } from "src/certificates/entities/certificate.entity";
import { Image } from "src/images/entities/image.entity";
import { Verification } from "src/verifications/entities/verification.entity";

export type RegisterRequestDto = {
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  password: string;
  images: Image[];
  verifications: Verification[];
};
