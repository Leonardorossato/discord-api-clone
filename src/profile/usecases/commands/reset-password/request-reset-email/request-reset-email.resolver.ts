import { Body } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ControllerBase } from "src/core/application/controller.base";
import { RequestResetEmailDto } from "./request-reset-email.dto";
import { RequestResetEmailUseCase } from "./request-reset-email.usecase";
import { Profile } from "src/profile/schema/profile.schema";

@Resolver()
export class RequestResetEmailResolver extends ControllerBase{
  constructor(
    private readonly requestResetEmailUseCase: RequestResetEmailUseCase
  ) {
    super();
  }

  @Mutation((returns) => Profile)
  async requestResetEmail(@Args('data') data: RequestResetEmailDto){
    const result = await this.requestResetEmailUseCase.requestResetEmail(data.email)

    if(result.isFailure){
      return this.handleErrorResponse(result.error)
    }

    return result.value
  }
}