import { Inject, Injectable } from '@nestjs/common';

import { Result } from 'src/core/application/result';
import { ForbiddenException } from 'src/core/exceptions';
import { UpdateUserDto } from './update-user.dto';
import { UserInterface, UserRepositoryInterface } from 'src/profile/repositories/user.repository.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async update(id: number, data: UpdateUserDto): Promise<Result<UserInterface>> {
    const user = (await this.userRepository.findById(id)).value;
    if (!user) {
      return Result.fail(new ForbiddenException('User not found'));
    }
    user.email = data.email;
    user.name = data.name;
    user.updatedAt = new Date();
    const updatedUserOrError = await this.userRepository.update(id, user);
    if (updatedUserOrError.isFailure) {
      return Result.fail(updatedUserOrError.error);
    }
    return Result.ok(updatedUserOrError).value;
  }
}
