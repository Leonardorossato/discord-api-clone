import { Field, ObjectType } from '@nestjs/graphql';
import { Channel, Server } from 'src/server/schema/server.schema';

@ObjectType()
export class Profile {
  @Field()
  id: number;

  @Field({ name: 'email', description: 'Email do usuário' })
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field(() => [Server], { nullable: 'itemsAndList' })
  servers: Server[];

  @Field()
  imageUrl: string;

  @Field(() => [Channel], { nullable: 'itemsAndList' })
  channels: Channel[];

  @Field({ nullable: true })
  token?: string;
}
