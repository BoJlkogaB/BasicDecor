import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './models/tasks.model';
import { findByName } from '../../../traits/find-by.trait';
import { StatusesService } from '../statuses/statuses.service';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { UsersService } from '../users/users.service';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { STATUSES } from '../../../constants/statuses.constants';
import { DeleteTasksDto } from './dto/delete-tasks.dto';
import { ClosingTasksDto } from './dto/closing-tasks.dto';
import { FindAllTasksDto } from './dto/find-all-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks) private repository: typeof Tasks,
    private statusesService: StatusesService,
    private usersService: UsersService,
  ) {}

  create = async (dto: CreateTasksDto): Promise<Tasks> => {
    const status = await this.statusesService.findByName(STATUSES.NEW);
    const user = await this.usersService.findByPk(dto.userID);

    return await this.repository.create({
      name: dto.name,
      statusID: status.id,
      userID: user.id,
    });
  };

  findAll = async (dto: FindAllTasksDto) => {
    if (dto.statusName === 'NONE') {
      return await this.repository.findAll();
    }

    const status = await this.statusesService.findByName(STATUSES.AT_WORK);

    return await this.repository.findAll({ where: { statusID: status.id } });
  };

  findByPk = async (id) => {
    const task = await this.repository.findByPk(id);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const status = await this.statusesService.findByName(STATUSES.AT_WORK);

    await this.repository.update(
      {
        name: task.name,
        userID: task.userID,
        statusID: status.id,
      },
      { where: { id: task.id } },
    );

    task.statusID = status.id;

    return task;
  };

  closing = async (dto: ClosingTasksDto) => {
    if (dto.text.indexOf('ERROR') !== -1) {
      throw new HttpException(
        'There is some kind of error',
        HttpStatus.BAD_REQUEST,
      );
    }

    const status = await this.statusesService.findByName(STATUSES.DONE);

    return await this.repository.update(
      {
        statusID: status.id,
      },
      { where: { id: dto.id } },
    );
  };

  update = async (dto: UpdateTasksDto) => {
    const status = await this.statusesService.findByName(dto.statusName);
    const user = await this.usersService.findByPk(dto.userID);

    return await this.repository.update(
      {
        name: dto.name,
        userID: user.id,
        statusID: status.id,
      },
      { where: { id: dto.id } },
    );
  };

  destroy = async (dto: DeleteTasksDto) => {
    const task = await this.repository.findByPk(dto.id);
    const status = await this.statusesService.findByPk(task.statusID);

    if (status.name !== STATUSES.NEW) {
      throw new HttpException(
        'The status of the task is not new',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (task.userID !== dto.userID) {
      throw new HttpException(
        'This task does not belong to you',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.repository.destroy({ where: { id: dto.id } });
  };

  findByName = findByName;
}
