import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  document: string;
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    description: 'Email do Usuário',
    example: 'jhondoe@dev.com',
  })
  email: string;
  @ApiProperty({
    description: 'Senha do Usuário',
    example: '123456',
  })
  password: string;

  @ApiProperty()
  imageUrl: string;
}
