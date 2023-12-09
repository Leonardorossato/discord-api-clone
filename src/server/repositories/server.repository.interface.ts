import { Result } from 'src/core/application/result';
import { Profile } from 'src/profile/schema/profile.schema';

export interface ServerRepositoryInterface {
  create(data: ServerInterface): Promise<Result<ServerInterface>>;
  findAll(): Promise<Result<ServerInterface[]>>;
  findById(id: number): Promise<Result<ServerInterface>>;
  findServerByIdAndProfileEmail(id: number, email: string): Promise<Result<ServerInterface>>
  findServerByProfileEmail(email: string): Promise<Result<ServerInterface[]>>;
}

export interface ServerInterface {
  id?: number;
  name: string;
  description: string;
  inviteCode?: string;
  imageUrl: string;
  profile?: Profile[];
  profileId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
