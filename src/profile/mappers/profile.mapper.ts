import { ProfileDomainEntity, ProfileProps } from '../domain/profile.domain';

export class ProfileMapper {
  static toDomain(profile: ProfileProps): ProfileDomainEntity {
    return ProfileDomainEntity.load(
      {
        name: profile.name,
        email: profile.email,
        password: profile.password,
        imageUrl: profile.imageUrl,
      },
      profile.id,
    );
  }

  static toPersistence(profile: ProfileDomainEntity): ProfileProps {
    const { name, email, password, imageUrl } = profile.getPropsCopy();
    return {
      name: name,
      email: email,
      password: password,
      imageUrl: imageUrl,
    };
  }
}
