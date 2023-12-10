import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProfileByIdUseCase } from './find-profile-by-id.usecase';
import { Profile } from 'src/profile/schema/profile.schema';
import { ControllerBase } from 'src/core/application/controller.base';

@Resolver()
export class FindProfileByIdResolver extends ControllerBase {
  constructor(private readonly findProfileByIdUseCase: FindProfileByIdUseCase) {
    super();
  }

  @Query(() => Profile)
  async findProfileById(@Args('id') id: number) {
    const result = await this.findProfileByIdUseCase.findById(id);
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
