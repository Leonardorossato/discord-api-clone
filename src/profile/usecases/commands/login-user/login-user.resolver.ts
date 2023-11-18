import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ControllerBase } from 'src/core/application/controller.base';
import { LoginUserDto } from './login-user.dto';
import { LoginUserUseCase } from './login-user.usecase';
import { Profile } from 'src/profile/schema/profile.schema';

@Resolver()
export class LoginUserResolver extends ControllerBase {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {
    super();
  }

  @Mutation((returns) => Profile)
  async login(@Args('input') data: LoginUserDto): Promise<{ token: string; userId: number }> {
    const result = await this.loginUserUseCase.login(data);
    if (result.isFailure) {
      throw this.handleErrorResponse(result.error);
    }

    return result.value;
  }
}
