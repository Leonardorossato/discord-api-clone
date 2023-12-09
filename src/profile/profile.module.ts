import { Module } from '@nestjs/common';
import { emailProvider } from './providers/mailer/email.provider';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/implements/user.respository';
import { ChangeUserPassowrdController } from './usecases/commands/change-user-password/change-user-password.controller';
import { ChangeUserPassowrdUseCase } from './usecases/commands/change-user-password/change-user-password.usecase';
import { LoginUserController } from './usecases/commands/login-user/login-user.controller';
import { LoginUserUseCase } from './usecases/commands/login-user/login-user.usecase';
import { RegisterUserController } from './usecases/commands/register-user/register-user.controller';
import { RegisterUserUseCase } from './usecases/commands/register-user/register-user.usecase';
import { RequestResetEmailController } from './usecases/commands/reset-password/request-reset-email/request-reset-email.controller';
import { RequestResetEmailUseCase } from './usecases/commands/reset-password/request-reset-email/request-reset-email.usecase';
import { RequestResetPasswordController } from './usecases/commands/reset-password/request-reset-password/request-reset-password.controller';
import { RequestResetPasswordUseCase } from './usecases/commands/reset-password/request-reset-password/request-reset-password.usecase';
import { UpdateUserController } from './usecases/commands/update-user/update-user.controller';
import { UpdateUserUseCase } from './usecases/commands/update-user/update-user.usecase';
import { LoginUserResolver } from './usecases/commands/login-user/login-user.resolver';
import { RegisterUserResolver } from './usecases/commands/register-user/register-user.resolver';
import { RequestResetEmailResolver } from './usecases/commands/reset-password/request-reset-email/request-reset-email.resolver';
import { RequestResetPasswordResolver } from './usecases/commands/reset-password/request-reset-password/request-reset-password.resolver';
import { FindProfileByIdController } from './usecases/queries/find-profile-by-id/find-profile-by-id.controller';
import { FindProfileByIdUseCase } from './usecases/queries/find-profile-by-id/find-profile-by-id.usecase';
import { FindProfileByIdResolver } from './usecases/queries/find-profile-by-id/find-profile-by-id.resolver';

@Module({
  controllers: [
    LoginUserController,
    FindProfileByIdController,
    RegisterUserController,
    ChangeUserPassowrdController,
    RequestResetEmailController,
    RequestResetPasswordController,
    UpdateUserController,
  ],
  providers: [
    LoginUserUseCase,
    LoginUserResolver,
    RegisterUserUseCase,
    RegisterUserResolver,
    ChangeUserPassowrdUseCase,
    RequestResetEmailUseCase,
    RequestResetEmailResolver,
    RequestResetPasswordUseCase,
    RequestResetPasswordResolver,
    UpdateUserUseCase,
    FindProfileByIdUseCase,
    FindProfileByIdResolver,
    {
      provide: 'profile_repository',
      useClass: UserRepository,
    },
    {
      provide: 'jwt-service',
      useFactory: () => {
        return new JwtService({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        });
      },
    },
    {
      provide: 'email-provider',
      useClass: emailProvider,
    },
  ],
})
export class ProfileModule {}
