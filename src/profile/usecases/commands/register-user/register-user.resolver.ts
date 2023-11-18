import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ControllerBase } from 'src/core/application/controller.base';
import { RegisterDto } from './register-user.dto';
import { RegisterUserUseCase } from './register-user.usecase';
import { Profile } from 'src/profile/schema/profile.schema';

@Resolver()
export class RegisterUserResolver extends ControllerBase {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {
    super();
  }

  @Mutation((returns) => Profile)
  async register(@Args('input') data: RegisterDto) {
    const result = await this.registerUserUseCase.register(data);
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }

    return result.value;
  }
}
