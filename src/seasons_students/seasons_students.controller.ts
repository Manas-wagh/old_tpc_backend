import { seasonsStudentsServices } from './seasons_students.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Get, Delete, Param, UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from 'src/interceptor/LoggerInterceptor';
import { TransactionInterceptor } from 'src/interceptor/TransactionInterceptor';
import { randomUUID } from 'crypto';

@UseInterceptors(new LoggerInterceptor())
@Controller('/seasons/:season_id/students')
export class seasonsStudentsController {
  constructor(private seasonsStudentsService: seasonsStudentsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  getSeason(@Param('season_id') seasonId: string): Promise<any> {
    return this.seasonsStudentsService.get(seasonId);
  }

  //   @Patch(':student_id')
  //   @HttpCode(HttpStatus.OK)
  //   @UseInterceptors(TransactionInterceptor)
  //   updateStudentSeason(@Param('student_id') studentId: typeof randomUUID,@Body() student:studentDto): Promise<any> {
  //     return this.seasonsStudentsService.update(studentId);
  //   }

  @Delete(':student_id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  deleteSeason(@Param('student_id') studentId: string): Promise<any> {
    return this.seasonsStudentsService.delete(studentId);
  }
}

// /seasons/:season_id/students
// POST: body: {}   // add student to season ?
// GET: res: [{}] // get list of students for given season
// PATCH: /:student_id | body: {} // update student details/status of registration/freeze/penalty
// DELETE: /:student_id // delete
