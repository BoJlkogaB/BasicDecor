import {
  create,
  destroy,
  findAll,
  findByPk,
  update,
} from '../traits/CRUD.trait';

export abstract class EntityService {
  create = create;
  findAll = findAll;
  findByPk = findByPk;
  update = update;
  destroy = destroy;
}
