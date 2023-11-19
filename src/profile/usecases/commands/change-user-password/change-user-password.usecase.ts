import { Inject, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './change-user-password.dto';
import { Result } from 'src/core/application/result';
import { ForbiddenException } from 'src/core/exceptions';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from 'src/profile/repositories/user.repository.interface';

@Injectable()
export class ChangeUserPassowrdUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async changePassword(data: ChangePasswordDto): Promise<any> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      return Result.fail(new ForbiddenException('User existent'));
    }

    if (!bcrypt.compareSync(data.oldPassword, user.value.password)) {
      return Result.fail(new ForbiddenException('User of password incorrect'));
    }

    const newPasswordHash = bcrypt.hashSync(data.newPassword, 10);
    user.value.password = newPasswordHash;
    user.value.updatedAt = new Date();
    await this.userRepository.update(user.value.id, user.value);

    return Result.ok({
      message: 'Password changed successfully',
    });
  }
}
