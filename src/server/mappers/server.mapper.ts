import { Profile } from 'src/profile/schema/profile.schema';
import { ServerDomainEntity } from '../domain/server.domain';
import { Channel } from '../schema/server.schema';

export class ServerMapper {
  static toDomain(server: ServerProps): ServerDomainEntity {
    return ServerDomainEntity.load(
      {
        name: server.name,
        description: server.description,
        imageUrl: server.imageUrl,
        profile: server.profile,
        channels: server.channels,
        profileId: server.profileId,
      },
      server.id,
    );
  }

  static toPersistence(server: ServerDomainEntity): ServerProps {
    const { name, description, imageUrl, profile, profileId, channels } =
      server.getPropsCopy();
    return {
      name: name,
      description: description,
      imageUrl: imageUrl,
      profile: profile,
      profileId: profileId,
      channels: channels,
    };
  }
}

export interface ServerProps {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  inviteCode?: string;
  channels?: Channel[];
  profile?: Profile[];
  profileId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
