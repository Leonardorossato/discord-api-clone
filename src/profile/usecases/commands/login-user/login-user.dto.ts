import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginUserDto {
  @Field()
  @ApiProperty({
    description: 'Email do usuario',
    example: 'example@example.com',
  })
  email: string;

  @Field()
  @ApiProperty({
    description: 'Senha do Usuário',
    example: '123456',
  })
  password: string;
}
