import { Query, Resolver } from '@nestjs/graphql';
@Resolver('services')
export class ServerResolver {
  @Query(() => String)
  async helloGraphQL() {
    return 'hello';
  }
}
