import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email do usuario',
    example: 'example@example.com',
  })
  email: string;
  @ApiProperty({
    description: 'Senha do Usuário',
    example: '123456',
  })
  password: string;
}
