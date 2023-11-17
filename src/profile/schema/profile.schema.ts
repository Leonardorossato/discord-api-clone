import { Field, ObjectType } from '@nestjs/graphql';
import { Channel, Server } from 'src/server/schema/server.schema';

@ObjectType()
export class Profile {
  @Field()
  id: number;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Server], { nullable: 'itemsAndList' })
  servers: Server[];

  @Field()
  imageUrl: string;

  @Field(() => [Channel], { nullable: 'itemsAndList' })
  channels: Channel[];
}
