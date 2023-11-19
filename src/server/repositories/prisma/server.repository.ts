import { Injectable } from '@nestjs/common';
import {
  ServerInterface,
  ServerRepositoryInterface,
} from '../server.repository.interface';
import { MemberRole, PrismaClient } from '@prisma/client';
import { Result } from 'src/core/application/result';
import { ServerMapper } from 'src/server/mappers/server.mapper';
import { NotFoundException } from 'src/core/exceptions';
import { randomUUID } from 'crypto';
import { ServerDomainEntity } from 'src/server/domain/server.domain';

@Injectable()
export class ServerRepository implements ServerRepositoryInterface {
  private readonly serverRepository = new PrismaClient().server;
  private readonly profileRepository = new PrismaClient().profile;

  async findAll(): Promise<Result<ServerInterface[]>> {
    const server = await this.serverRepository.findMany();
    return Result.ok<ServerInterface[]>(
      server.map((server) => ServerMapper.toDomain(server).getPropsCopy()),
    );
  }

  async create(data: ServerInterface): Promise<Result<ServerInterface>> {
    const profile = await this.profileRepository.findUnique({
      where: {
        id: data.profileId,
      },
    });
    if (!profile) {
      return Result.fail(new NotFoundException('Profile not found'));
    }
    const newServer = await this.serverRepository.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        inviteCode: randomUUID(),
        profile: {
          connect: {
            id: data.profileId,
            name: 'General',
          },
        },
        members: {
          create: [
            {
              profileId: data.profileId,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });
    return Result.ok(ServerMapper.toDomain(newServer).getPropsCopy());
  }
  async findById(id: number): Promise<Result<ServerInterface>> {
    const server = await this.serverRepository.findUnique({
      where: { id: id },
      include: {
        members: true,
      },
    });
    if (!server) {
      return Result.fail(new NotFoundException('Server not found'));
    }
    return Result.ok(ServerMapper.toDomain(server).getPropsCopy());
  }

  async findServerByIdAndProfileEmail(
    id: number,
    email: string,
  ): Promise<Result<ServerInterface>> {
    const profile = await this.profileRepository.findUnique({
      where: { email: email },
    });
    if (!profile) {
      return Result.fail(new NotFoundException('Profile not found'));
    }
    const server = await this.serverRepository.findUnique({
      where: {
        id: id,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });
    if (!server) {
      return Result.fail(new NotFoundException('Server not found'));
    }
    return Result.ok(ServerMapper.toDomain(server).getPropsCopy());
  }

  async findServerByProfileEmail(
    email: string,
  ): Promise<Result<ServerInterface[]>> {
    const server = await this.serverRepository.findMany({
      where: {
        members: {
          some: {
            profile: {
              email: email,
            },
          },
        },
      },
    });
    return Result.ok<ServerInterface[]>(
      server.map((server) => ServerMapper.toDomain(server).getPropsCopy()),
    );
  }
}
