import { Result } from 'src/core/application/result';

export interface UserRepositoryInterface {
  create(data: UserInterface): Promise<Result<UserInterface>>;
  findByEmail(email: string): Promise<Result<UserInterface>>;
  findById(id: number): Promise<Result<UserInterface>>;
  update(id: number, data: UserInterface): Promise<Result<UserInterface>>;
}

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
