import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repo';
import { SubjectRepository } from './subject.repo';
import { User } from 'src/user/entity/user.entity';
import { SubjectDTO } from './dto/common.dto';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// util function
const isTimeOverlap = (time: string, targetTime: string) => {
  const [start1, end1] = time.split('-');
  const [start2, end2] = targetTime.split('-');

  const start1Minutes = convertTimeToMinutes(start1);
  const end1Minutes = convertTimeToMinutes(end1);
  const start2Minutes = convertTimeToMinutes(start2);
  const end2Minutes = convertTimeToMinutes(end2);

  // 시간이 겹치는지 확인
  if (
    (start1Minutes <= start2Minutes && start2Minutes < end1Minutes) ||
    (start1Minutes < end2Minutes && end2Minutes <= end1Minutes) ||
    (start2Minutes <= start1Minutes && start1Minutes < end2Minutes) ||
    (start2Minutes < end1Minutes && end1Minutes <= end2Minutes)
  ) {
    return true; // 중복되는 시간이 있음
  }

  return false; // 중복되는 시간이 없음
};

const convertTimeToMinutes = (time: string): number => {
  const hours = parseInt(time.substr(0, 2));
  const minutes = parseInt(time.substr(2, 2));
  return hours * 60 + minutes;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepo: ScheduleRepository,
    private readonly subjectRepo: SubjectRepository,
  ) {}

  async AddSubject(userData: User, subjectData: SubjectDTO) {
    // 1. 해당 user의 schdule 찾기
    const targetSchedule = await this.scheduleRepo.findOneBy({
      user: userData,
    });
    // 2. 해당 user schedule에 들어가있는 subject 찾기
    const targetSubjects = await this.subjectRepo.findBy({
      schedule: targetSchedule,
    });
    console.log(targetSubjects);

    // 현재 subject와 겹치는 애가 있는지 여부 확인
    for (const subject of targetSubjects) {
      if (subjectData.day === subject.day) {
        // 겹치는 시간이 있을 경우
        if (isTimeOverlap(subjectData.time, subject.time)) {
            return false;
        }
        // 3. 시간표에 추가
        
        
      }
    }


    return true;
  }
}