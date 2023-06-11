// core
import { Injectable } from '@nestjs/common';

// lib
import { DataSource, Repository } from 'typeorm';
import { Subject } from './entity/subject.entity';

@Injectable()
export class SubjectRepository extends Repository<Subject> {
  constructor(private dataSource: DataSource) {
    super(Subject, dataSource.createEntityManager());
  }
}
