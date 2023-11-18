import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
@InputType()
export class RegisterDto {
  @Field()
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'John Doe',
  })
  name: string;

  @Field()
  @ApiProperty({
    description: 'Email do Usuário',
    example: 'jhondoe@dev.com',
  })
  email: string;

  @Field()
  @ApiProperty({
    description: 'Senha do Usuário',
    example: '123456',
  })
  password: string;

  @Field()
  @ApiProperty()
  imageUrl: string;
}
