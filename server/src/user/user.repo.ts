import { DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // crate user
  async createUser(user: User) {
    return await this.manager.save(User, user);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // find user by id
  async findOneByID(id: string): Promise<User | undefined> {
    return await this.manager.findOne(User, {
      where: {
        id: id,
      },
    });
  }
}
