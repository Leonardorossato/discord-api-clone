import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './login-user.dto';
import { Result } from 'src/core/application/result';
import { ForbiddenException } from 'src/core/exceptions';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from 'src/profile/repositories/user.repository.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly profileRepository: UserRepositoryInterface,
    @Inject('jwt-service') private readonly jwtService: JwtService,
  ) {}

  async login(
    data: LoginUserDto,
  ): Promise<Result<{ token: string; userId: number }>> {
    const { password } = data;
    const user = await this.profileRepository.findByEmail(data.email);

    if (!user) {
      return Result.fail(new ForbiddenException('User or password incorrect'));
    }

    if (!bcrypt.compareSync(password, user.value.password)) {
      return Result.fail(new ForbiddenException('User or password incorrect'));
    }

    const token = this.jwtService.sign({ sub: user.value.id });

    return Result.ok({ token, userId: user.value.id });
  }
}
