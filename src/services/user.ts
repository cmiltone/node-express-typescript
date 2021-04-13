import { injectable } from 'inversify';

@injectable()
export class UserService {
  async update(
    userId: string,
    update: {
      username?: User['username'];
      firstName?: User['firstName'];
      lastName?: User['lastName'];
      phoneNumber?: User['phoneNumber'];
      email?: User['email'];
      role?: User['role'];
      status?: User['status'];
    },
  ): Promise<User> {
    const user = { ...update };

    if (!user) throw new Error('User not found');

    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = { id: userId };

    if (!user) throw new Error('User not found');

    return user;
  }

  async delete(userId: string): Promise<User> {
    const user = { id: userId };

    if (!user) throw new Error('User not found');

    return user;
  }
}
