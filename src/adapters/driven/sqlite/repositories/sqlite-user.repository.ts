import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SqliteUserEntity } from '../entities/sqlite-user.entity';
import { User } from 'src/domains/user/model/entity/user.entity';
import { UserRepositoryPort } from '@domains/user/ports/driven/repository/user.repository.port';

@Injectable()
export class SqliteUserRepository implements UserRepositoryPort {
  constructor(private readonly entityManager: EntityManager) {}

  create(user: User): User {
    const userEntity = this.toEntity(user);
    return this.toDomain(userEntity);
  }

  async save(user: User): Promise<User> {
    const userEntity = this.toEntity(user);
    const savedEntity = await this.entityManager.save(
      SqliteUserEntity,
      userEntity,
    );
    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.entityManager.findOne(SqliteUserEntity, {
      where: { id },
    });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.entityManager.findOne(SqliteUserEntity, {
      where: { email },
    });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  async update(user: User): Promise<User> {
    const userEntity = this.toEntity(user);
    const updatedEntity = await this.entityManager.save(
      SqliteUserEntity,
      userEntity,
    );
    return this.toDomain(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.entityManager.delete(SqliteUserEntity, { id });
  }

  private toEntity(domain: User): SqliteUserEntity {
    const entity = new SqliteUserEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.password = domain.password;
    entity.type = domain.type;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }

  private toDomain(entity: SqliteUserEntity): User {
    const domain = new User();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.email = entity.email;
    domain.password = entity.password;
    domain.type = entity.type;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }
}
