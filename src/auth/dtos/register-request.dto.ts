import { Image } from "src/images/entities/image.entity";


export type RegisterRequestDto = {
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  password: string;
  images: Image[];
};
