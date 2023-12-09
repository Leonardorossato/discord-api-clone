import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Profile } from 'src/profile/schema/profile.schema';
import { Server } from 'src/server/schema/server.schema';

@ObjectType()
export class Member {
  @Field()
  id: number;

  @Field(() => Profile, { nullable: true })
  profile: Profile;

  @Field(() => Server, { nullable: true })
  server: Server;

  @Field(() => memberRole)
  role: memberRole;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}

export enum memberRole {
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

registerEnumType(memberRole, {
  name: 'memberRole',
  description: 'Defines the role of member',
});
