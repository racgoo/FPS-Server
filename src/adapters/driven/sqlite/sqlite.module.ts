import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteUserEntity } from './entities/sqlite-user.entity';
import { EnvService } from 'src/shared/modules/env/env.service';
import { SqliteLogEntity } from './entities/sqlite-log.entity';
import { DataSource } from 'typeorm';
import { SqliteUserRepository } from './repositories/sqlite-user.repository';
import { UserRepositoryPortSymbol } from '@domains/user/ports/driven/repository/user.repository.port';
import { SqliteChatRoomEntity } from './entities/sqlite-chat-room.entity';
import { SqliteChatMessageEntity } from './entities/sqlite-chat-message.entity';
import { SqliteChatRepository } from './repositories/sqlite-chat.repository';
import { ChatRepositoryPortSymbol } from '@domains/chat/ports/driven/repository/chat.repository.port';

const sqliteEntities = [
  SqliteUserEntity,
  SqliteLogEntity,
  SqliteChatRoomEntity,
  SqliteChatMessageEntity,
];

const sqliteRepositories = [
  {
    provide: UserRepositoryPortSymbol,
    useClass: SqliteUserRepository,
  },
  {
    provide: ChatRepositoryPortSymbol,
    useClass: SqliteChatRepository,
  },
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
      //TRANSACTIONAL DATA SOURCE
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
      inject: [EnvService],
    }),
  ],
  providers: [...sqliteRepositories],
  exports: [...sqliteRepositories],
})
export class SqliteModule {}
