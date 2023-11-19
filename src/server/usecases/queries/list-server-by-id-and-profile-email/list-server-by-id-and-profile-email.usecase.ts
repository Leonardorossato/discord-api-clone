import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import { NotFoundException } from 'src/core/exceptions';
import { UserRepositoryInterface } from 'src/profile/repositories/user.repository.interface';
import {
  ServerInterface,
  ServerRepositoryInterface,
} from 'src/server/repositories/server.repository.interface';

@Injectable()
export class ListServerByIdAndProfileEmailUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly profileRepository: UserRepositoryInterface,
    @Inject('server_repository')
    private readonly serverRepository: ServerRepositoryInterface,
  ) {}

  async findByIdAndProfileEmail(
    id: number,
    email: string,
  ): Promise<Result<ServerInterface>> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      return Result.fail<ServerInterface>(
        new NotFoundException('Profile não encontrado'),
      );
    }
    const server = await this.serverRepository.findServerByIdAndProfileEmail(
      profile.value.id,
      email,
    );
    if (!server) {
      return Result.fail<ServerInterface>(
        new NotFoundException('Servidor não encontrado'),
      );
    }
    return Result.ok<ServerInterface>(server.value);
  }
}
