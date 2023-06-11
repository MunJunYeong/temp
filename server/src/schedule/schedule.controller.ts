import { Body, Get, Put, Post, Query, Req, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubjectDTO } from './dto/common.dto';

@ApiTags('v1/schedule')
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
}
