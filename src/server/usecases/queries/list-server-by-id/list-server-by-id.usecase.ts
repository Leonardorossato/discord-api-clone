import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import { NotFoundException } from 'src/core/exceptions';
import {
  ServerInterface,
  ServerRepositoryInterface,
} from 'src/server/repositories/server.repository.interface';

@Injectable()
export class ListServerByIdUseCase {
  constructor(
    @Inject('server_repository')
    private readonly serverRepository: ServerRepositoryInterface,
  ) {}

  async findById(id: number): Promise<Result<ServerInterface>> {
    const server = await this.serverRepository.findById(id);
    if (!server) {
      return Result.fail<ServerInterface>(
        new NotFoundException('Servidor não encontrado'),
      );
    }
    return Result.ok<ServerInterface>(server.value);
  }
}
