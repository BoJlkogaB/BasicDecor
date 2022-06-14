import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../database/entity.service';
import { findByEmail } from '../../../traits/find-by.trait';
import { CreateUsersDto } from './dto/create-users.dto';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService extends EntityService {
  constructor(@InjectModel(Users) private repository: typeof Users) {
    super();
  }

  create = async (dto: CreateUsersDto): Promise<Users> => {
    const candidate = await this.repository.findOne({
      where: { email: dto.email },
    });

    if (candidate) {
      throw new HttpException(
        'A user with this Email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.setPasswordToUser(dto);

    const uuid = randomUUID();

    return await this.repository.create({ id: uuid, ...dto });
  };

  private async setPasswordToUser(dto) {
    dto.password = await bcrypt.hash(dto.password, 6);
  }

  findByEmail = findByEmail;
}
