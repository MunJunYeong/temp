// core
import { Injectable } from '@nestjs/common';

// lib
import { DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
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
