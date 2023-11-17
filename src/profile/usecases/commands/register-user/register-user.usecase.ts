import { Injectable, Inject } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import { ForbiddenException } from 'src/core/exceptions';
import { RegisterDto } from './register-user.dto';
import * as bcrypt from 'bcrypt';
import {
  UserInterface,
  UserRepositoryInterface,
} from 'src/profile/repositories/user.repository.interface';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async register(data: RegisterDto): Promise<Result<UserInterface>> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      return Result.fail(new ForbiddenException('User existent'));
    }

    const passwordHash = bcrypt.hashSync(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    if (user.isFailure) {
      return Result.fail(new ForbiddenException('User existent'));
    }

    return Result.ok(user.value);
  }
}
