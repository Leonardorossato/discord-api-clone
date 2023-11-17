import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result } from 'src/core/application/result';
import { NotFoundException } from 'src/core/exceptions';
import { emailProviderInterface } from 'src/profile/providers/mailer/email.provider.interface';
import { UserRepositoryInterface } from 'src/profile/repositories/user.repository.interface';

@Injectable()
export class RequestResetEmailUseCase {
  constructor(
    @Inject('profile_repository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('jwt-service')
    private readonly jwtService: JwtService,
    @Inject('email-provider')
    private readonly emailProvider: emailProviderInterface,
  ) {}

  async requestResetEmail(email: string): Promise<Result<any>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return Result.fail(new NotFoundException('User not found'));
    }

    const token = this.jwtService.sign(
      {
        sub: user.value.id,
      },
      {
        expiresIn: '30m',
      },
    );

    const url = `Hi, Please follow this link to reset your password. This is valid for 10 minutes. <a href="http://localhost:${process.env.AUTH_URL}/reset-password/${token}">Click here</a>`;
    const data = {
      to: user.value.email,
      text: 'Hey User',
      from: 'Hey <abc@gmail.com>',
      subject: 'Forgot Password Link',
      html: url,
    };

    await this.emailProvider.sendMail(data);

    return Result.ok<any>({
      message: 'Token send to email successfully',
    });
  }
}
