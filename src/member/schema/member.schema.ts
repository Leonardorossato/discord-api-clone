import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => MemberRole)
  role?: MemberRole;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

export enum MemberRole {
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

registerEnumType(MemberRole, {
  name: 'MemberRole',
  description: 'Member Role',
});
