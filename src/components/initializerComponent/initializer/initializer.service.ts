import { Injectable } from '@nestjs/common';
import { STATUSES } from '../../../constants/statuses.constants';
import { UsersService } from '../../mainComponent/users/users.service';
import { StatusesService } from '../../mainComponent/statuses/statuses.service';

@Injectable()
export class InitializerService {
  constructor(
    private statusesService: StatusesService,
    private usersService: UsersService,
  ) {}

  async initialization() {
    await InitializerService.findOrCreateSimpleConstants([
      { service: this.statusesService, constants: STATUSES },
    ]);

    await this.findOrCreateAdminAccount();
    await this.findOrCreateUserAccount();
  }

  private static async findOrCreateSimpleConstants(data) {
    let constant;

    for (let i = 0; i < data.length; i++) {
      for (const key in data[i].constants) {
        constant = await this.getConstantByName(
          data[i].service,
          data[i].constants[key],
        );

        if (this.checkingForNull(constant)) {
          await this.createConstant(data[i].service, {
            name: data[i].constants[key],
          });
        }
      }
    }
  }

  private static async getConstantByName(service, name) {
    return service.findByName(name);
  }

  private static checkingForNull(constant) {
    return constant === null;
  }

  private static async createConstant(service, data) {
    service.create(data);
  }

  private async findOrCreateAdminAccount() {
    const account = await this.usersService.findByEmail('admin@gmail.com');

    if (account === null) {
      await this.usersService.create({
        email: 'admin@gmail.com',
        password: 'adminAdmin',
      });
    }
  }

  private async findOrCreateUserAccount() {
    const account = await this.usersService.findByEmail('user@gmail.com');

    if (account === null) {
      await this.usersService.create({
        email: 'user@gmail.com',
        password: 'userUser',
      });
    }
  }
}
