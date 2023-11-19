import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateServerDto {
  @ApiProperty()
  @Field()
  name: string;

  @ApiProperty()
  @Field()
  description: string;

  @ApiProperty()
  @Field()
  imageUrl: string;

  @ApiProperty()
  @Field()
  profileId: number;
}
