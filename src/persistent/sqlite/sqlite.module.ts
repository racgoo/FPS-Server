import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteUserEntity } from './entities/sqlite-user.entity';
import { SqlitePaymentEntity } from './entities/sqlite-payment.entity';
import { SqlitePaymentItemEntity } from './entities/sqlite-payment-item.entity';
import { EnvService } from 'src/shared/modules/env/env.service';
import { SqliteLogEntity } from './entities/sqlite-log.entity';

const sqliteEntities = [
  SqliteUserEntity,
  SqlitePaymentEntity,
  SqlitePaymentItemEntity,
  SqliteLogEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envService: EnvService) => ({
        type: 'sqlite',
        database: envService.get('DATABASE_URL'),
        entities: sqliteEntities,
        synchronize: true,
      }),
      inject: [EnvService],
    }),
  ],
})
export class SqliteModule {}
