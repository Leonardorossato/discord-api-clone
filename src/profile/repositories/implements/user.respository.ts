import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Result } from 'src/core/application/result';
import {
  ProfileDomainEntity,
  ProfileProps,
} from 'src/profile/domain/profile.domain';
import {
  UserInterface,
  UserRepositoryInterface,
} from '../user.repository.interface';
import { ProfileMapper } from 'src/profile/mappers/profile.mapper';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private readonly profileRepository = new PrismaClient().profile;

  async create(data: ProfileProps): Promise<Result<UserInterface>> {
    const user = await this.profileRepository.create({ data: data });
    const newProfile = ProfileDomainEntity.create(user);
    return Result.ok(newProfile.getPropsCopy());
  }
  async findByEmail(email: string): Promise<Result<UserInterface>> {
    const user = await this.profileRepository.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return Result.ok(ProfileMapper.toDomain(user).getPropsCopy());
  }
  async update(id: number, data: ProfileProps): Promise<Result<UserInterface>> {
    const user = await this.profileRepository.update({
      where: { id: id },
      data: data,
    });
    return Result.ok(ProfileMapper.toDomain(user).getPropsCopy());
  }
  async findById(id: number): Promise<Result<UserInterface>> {
    const user = await this.profileRepository.findUnique({
      where: { id: id },
    });
    return Result.ok(ProfileMapper.toDomain(user).getPropsCopy());
  }
}
