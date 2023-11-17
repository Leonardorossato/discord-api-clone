import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerResolver } from './server.resolver';
import { ServerController } from './server.controller';

@Module({
  controllers: [ServerController],
  providers: [ServerService, ServerResolver]
})
export class ServerModule {}
