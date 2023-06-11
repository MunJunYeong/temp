import { Body, Get, Post, Req, Param, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubjectDTO } from './dto/common.dto';
import { Subject } from './entity/subject.entity';

@ApiTags('schedule')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('v1/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // add subject
  @ApiOperation({ summary: 'add subject' })
  @ApiOkResponse({
    description: 'success',
    type: Boolean,
  })
  @Post('/subject')
  async addSubject(@Req() request: Request, @Body() subjectDTO: SubjectDTO): Promise<Boolean> {
    return this.scheduleService.AddSubject(request['user'], subjectDTO);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // get subject
  @ApiOperation({ summary: 'get subject' })
  @ApiOkResponse({
    description: 'subject value',
    type: [Subject],
  })
  @Get('/subject')
  async getSubject(@Req() request: Request): Promise<Subject[]> {
    return this.scheduleService.GetSubject(request['user']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // delete subject
  @ApiOperation({ summary: 'delete subject' })
  @ApiOkResponse({
    description: 'success',
    type: Boolean,
  })
  // 삭제할 때 해당 subject 정보를 params로 전달해줄지, body로 줄지는 확인해봐야함. 일단 임시로 param으로 받음
  @Delete('/subject/:subject_idx')
  async deleteSubject(@Req() request: Request, @Param('subject_idx') subjectIdx: number): Promise<Boolean> {
    return this.scheduleService.DeleteSubject(request['user'], subjectIdx);
  }
}
