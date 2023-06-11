import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from './schedule.repo';
import { SubjectRepository } from './subject.repo';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository, SubjectRepository],
  exports: [ScheduleRepository, SubjectRepository],
})
export class ScheduleModule {}
