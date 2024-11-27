import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { SqliteLogEntity } from 'src/adapters/driven/sqlite/entities/sqlite-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([SqliteLogEntity])],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
