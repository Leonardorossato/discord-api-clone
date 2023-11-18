import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { ServerModule } from './server/server.module';
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
        subscriptions: {}
      }),
    }),
    ServerModule,
    ProfileModule,
  ],
})
export class AppModule {}
