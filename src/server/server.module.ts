import { Module } from '@nestjs/common';
import { CreateServerController } from './usecases/commands/create-server/create-server.controller';
import { CreateServerUsecase } from './usecases/commands/create-server/create-server.usecase';
import { ServerRepository } from './repositories/prisma/server.repository';
import { UserRepository } from 'src/profile/repositories/implements/user.respository';
import { ListAllServerUseController } from './usecases/queries/list-all-servers/list-all-server.controller';
import { ListAllServerUsecase } from './usecases/queries/list-all-servers/list-all-server.uscease';
import { ListServerByIdUseCase } from './usecases/queries/list-server-by-id/list-server-by-id.usecase';
import { ListServerByIdAndProfileEmailUseController } from './usecases/queries/list-server-by-id-and-profile-email/list-server-by-id-and-profile-email.controller';
import { ListServerByIdUseController } from './usecases/queries/list-server-by-id/list-server-by-id.controller';
import { ListServerByIdAndProfileEmailUseCase } from './usecases/queries/list-server-by-id-and-profile-email/list-server-by-id-and-profile-email.usecase';
import { ListServerByProfileEmailUseCaseController } from './usecases/queries/list-server-by-profile-email/list-server-by-profile-email.controller';
import { ListServerByProfileEmailUseCase } from './usecases/queries/list-server-by-profile-email/list-server-by-profile-email.usecase';

@Module({
  controllers: [
    CreateServerController,
    ListAllServerUseController,
    ListServerByIdUseController,
    ListServerByIdAndProfileEmailUseController,
    ListServerByProfileEmailUseCaseController,
  ],
  providers: [
    CreateServerUsecase,
    ListAllServerUsecase,
    ListServerByIdUseCase,
    ListServerByIdAndProfileEmailUseCase,
    ListServerByProfileEmailUseCase,
    {
      provide: 'server_repository',
      useClass: ServerRepository,
    },
    {
      provide: 'profile_repository',
      useClass: UserRepository,
    },
  ],
})
export class ServerModule {}
