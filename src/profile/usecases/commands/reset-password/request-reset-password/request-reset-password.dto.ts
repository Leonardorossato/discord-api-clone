import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class RequestResetPasswordDto {
  @Field()
  @ApiProperty({
    description: 'Nova senha do Usuário',
    example: 'Aa.123456',
  })
  newPassword: string;
}
