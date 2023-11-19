import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import {
  ServerInterface,
  ServerRepositoryInterface,
} from 'src/server/repositories/server.repository.interface';

@Injectable()
export class ListAllServerUsecase {
  constructor(
    @Inject('server_repository')
    private readonly serverRepository: ServerRepositoryInterface,
  ) {}

  async findAll(): Promise<Result<ServerInterface[]>> {
    const servers = await this.serverRepository.findAll();
    return Result.ok(servers).value;
  }
}
