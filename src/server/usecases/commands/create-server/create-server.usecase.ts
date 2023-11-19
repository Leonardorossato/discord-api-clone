import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import { NotFoundException } from 'src/core/exceptions';
import { UserRepositoryInterface } from 'src/profile/repositories/user.repository.interface';
import {
  ServerInterface,
  ServerRepositoryInterface,
} from 'src/server/repositories/server.repository.interface';
import { CreateServerDto } from './create-server.dto';

@Injectable()
export class CreateServerUsecase {
  constructor(
    @Inject('server_repository')
    private readonly serverRepository: ServerRepositoryInterface,
    @Inject('profile_repository')
    private readonly profileRepository: UserRepositoryInterface,
  ) {}

  async execute(data: CreateServerDto): Promise<Result<ServerInterface>> {
    const profile = await this.profileRepository.findById(data.profileId);
    if (!profile) {
      return Result.fail(new NotFoundException('Profile not found'));
    }
    const newServer = await this.serverRepository.create({
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      profileId: data.profileId,
    });
    return Result.ok(newServer).value;
  }
}
