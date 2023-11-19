import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import { NotFoundException } from 'src/core/exceptions';
import { UserRepositoryInterface } from 'src/profile/repositories/user.repository.interface';
import {
  ServerInterface,
  ServerRepositoryInterface,
} from 'src/server/repositories/server.repository.interface';

@Injectable()
export class ListServerByProfileEmailUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly profileRepository: UserRepositoryInterface,
    @Inject('server_repository')
    private readonly serverRepository: ServerRepositoryInterface,
  ) {}

  async findServerByProfileEmail(
    email: string,
  ): Promise<Result<ServerInterface[]>> {
    const profile = await this.profileRepository.findByEmail(email);
    if (!profile) {
      return Result.fail<ServerInterface[]>(
        new NotFoundException('Profile com este email não encontrado'),
      );
    }
    const server = await this.serverRepository.findServerByProfileEmail(
      profile.value.email,
    );
    if (!server) {
      return Result.fail<ServerInterface[]>(
        new NotFoundException('Servidor não encontrado'),
      );
    }
    return Result.ok<ServerInterface[]>(server.value);
  }
}
