import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { databaseModule } from 'src/db/database.module';
import { seasonsStudentsController } from './seasons_students.controller';
import { seasonsStudentsServices } from './seasons_students.service';

@Module({
  imports: [databaseModule],
  controllers: [seasonsStudentsController],
  providers: [seasonsStudentsServices, ConfigService],
})
export class SeasonsStudentsModule {}
