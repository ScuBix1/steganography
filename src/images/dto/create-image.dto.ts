import { UUID } from 'crypto';

export class CreateImageDto {
  originalPath: string;
  modifiedPath: string;
  createdAt: Date;
  owner: UUID;
  count: number;
}
