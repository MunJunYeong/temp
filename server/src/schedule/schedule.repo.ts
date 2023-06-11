// core
import { Injectable } from '@nestjs/common';

// lib
import { DataSource, Repository } from 'typeorm';
import { Schedule } from './entity/schedule.entity';

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {
  constructor(private dataSource: DataSource) {
    super(Schedule, dataSource.createEntityManager());
  }
}
