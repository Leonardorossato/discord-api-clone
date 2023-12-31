import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';
import { ProfileModule } from './profile/profile.module';
import { ServerModule } from './server/server.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      inject: [],
      imports: [],
      driver: ApolloDriver,
      useFactory: async () => ({
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        subscriptions: {},
      }),
    }),
    ServerModule,
    ProfileModule,
    MemberModule,
  ],
})
export class AppModule {}
