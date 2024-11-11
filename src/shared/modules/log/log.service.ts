import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SqliteLogEntity } from 'src/persistent/sqlite/entities/sqlite-log.entity';
import { Repository } from 'typeorm';
import { EnvService } from '../env/env.service';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(SqliteLogEntity)
    private readonly logRepository: Repository<SqliteLogEntity>,
    private readonly envService: EnvService,
  ) {}

  async create(
    log: Omit<SqliteLogEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SqliteLogEntity> {
    const createdLog = this.logRepository.create(log);
    this.displayLog(createdLog);
    return this.logRepository.save(createdLog);
  }

  private displayLog(log: SqliteLogEntity) {
    if (this.envService.get('NODE_ENV') !== 'production') {
      // console.log(log);
    }
  }
}
