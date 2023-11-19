import { randomUUID } from 'crypto';
import { AggregateID, Entity } from 'src/core/domain/entity.base';
import { Profile } from 'src/profile/schema/profile.schema';
import { Channel } from '../schema/server.schema';

export class ServerDomainEntity extends Entity<ServerDomaineProps> {
  protected _id: AggregateID;

  static create(props: ServerDomaineProps) {
    return new ServerDomainEntity({ props, id: randomUUID() });
  }

  static load(
    props: ServerDomaineProps & { createdAt?: Date; updatedAt?: Date },
    id?: number,
  ) {
    const { createdAt, updatedAt, ...rest } = props;
    return new ServerDomainEntity({ props: rest, id, createdAt, updatedAt });
  }

  public validate(): void {
    if (!this.props.name) {
      throw new Error('Server name is required');
    }
    if (!this.props.description) {
      throw new Error('Server description is required');
    }
    if (!this.props.imageUrl) {
      throw new Error('Server image is required');
    }
    if (!this.props.profileId) {
      throw new Error('Profile id to create a server is required');
    }
  }
}

export interface ServerDomaineProps {
  id?: number;
  name: string;
  description: string;
  inviteCode?: string;
  imageUrl: string;
  channels?: Channel[];
  profile?: Profile[];
  profileId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
