import { Param } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ControllerBase } from 'src/core/application/controller.base';
import { RequestResetPasswordDto } from './request-reset-password.dto';
import { RequestResetPasswordUseCase } from './request-reset-password.usecase';
import { Profile } from 'src/profile/schema/profile.schema';

@Resolver()
export class RequestResetPasswordResolver extends ControllerBase {
  constructor(
    private readonly requestResetPasswordUseCase: RequestResetPasswordUseCase,
  ) {
    super();
  }

  @Mutation((returns) => Profile)
  async resetPassword(
    @Args('token') token: string,
    @Args('data') data: RequestResetPasswordDto,
  ) {
    const result = await this.requestResetPasswordUseCase.resetPassword(
      data,
      token,
    );
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
