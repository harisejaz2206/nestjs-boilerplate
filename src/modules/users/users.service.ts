import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

const scryptAsync = promisify(scryptCallback) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

const PASSWORD_HASH_ALGORITHM = 'scrypt';
const PASSWORD_HASH_KEY_LENGTH = 64;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const exists = await this.usersRepository.existsBy({ email: dto.email });
    if (exists) {
      throw new ConflictException('A user with this email already exists');
    }

    const passwordHash = await this.hashPassword(dto.password);

    const user = this.usersRepository.create({
      email: dto.email,
      name: dto.name,
      passwordHash,
    });

    const saved = await this.usersRepository.save(user);
    return this.toResponse(saved);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map((u) => this.toResponse(u));
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOneBy({ id });
    return user ? this.toResponse(user) : null;
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();
  }

  async verifyPassword(
    plainPassword: string,
    storedHash: string,
  ): Promise<boolean> {
    const [algorithm, salt, hash] = storedHash.split(':');
    if (algorithm !== PASSWORD_HASH_ALGORITHM || !salt || !hash) {
      return false;
    }

    const expected = Buffer.from(hash, 'hex');
    const actual = await scryptAsync(
      plainPassword,
      salt,
      PASSWORD_HASH_KEY_LENGTH,
    );

    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    );
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = await scryptAsync(password, salt, PASSWORD_HASH_KEY_LENGTH);

    return `${PASSWORD_HASH_ALGORITHM}:${salt}:${hash.toString('hex')}`;
  }

  // Maps entity to response DTO, keeping password out of the response shape.
  private toResponse(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
