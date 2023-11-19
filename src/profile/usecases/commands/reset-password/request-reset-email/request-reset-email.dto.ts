import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class RequestResetEmailDto {
  @ApiProperty()
  @Field({name: 'email', description: 'Email do usuário'})
  email: string;
}

export class ResponseResetEmailDto {
  token: string;
}
