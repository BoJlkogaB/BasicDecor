import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../database/entity.service';
import { findByName } from '../../../traits/find-by.trait';
import { Statuses } from './models/statuses.model';

@Injectable()
export class StatusesService extends EntityService {
  constructor(@InjectModel(Statuses) private repository: typeof Statuses) {
    super();
  }

  findByName = findByName;
}
