import { randomUUID } from 'crypto';
import { AggregateID, Entity } from 'src/core/domain/entity.base';

export class ProfileDomainEntity extends Entity<ProfileProps> {
  protected _id: AggregateID;

  static create(props: ProfileProps) {
    return new ProfileDomainEntity({ props, id: randomUUID() });
  }

  static load(
    props: ProfileProps & { createdAt?: Date; updatedAt?: Date },
    id?: number,
  ) {
    const { createdAt, updatedAt, ...rest } = props;
    return new ProfileDomainEntity({ props: rest, id, createdAt, updatedAt });
  }

  public validate(): void {
    if (!this.props.name) throw new Error('Usuario precisa de um nome');

    if (!this.props.email) throw new Error('Usuario precisa de um email');

    if (!this.props.password) throw new Error('Usuario precisa de um password');

    if (!this.props.imageUrl) throw new Error('Usuario precisa de uma imagem');
  }
}

export interface ProfileProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProfileUpdateProps = Partial<ProfileProps>;
