import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import { NotFoundException } from 'src/core/exceptions';
import {
  UserInterface,
  UserRepositoryInterface,
} from 'src/profile/repositories/user.repository.interface';

@Injectable()
export class FindProfileByIdUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async findById(id: number): Promise<Result<UserInterface>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return Result.fail(new NotFoundException('User existent'));
    }

    return Result.ok(user.value);
  }
}
