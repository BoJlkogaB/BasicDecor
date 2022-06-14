import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Tasks } from './models/tasks.model';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { ClosingTasksDto } from './dto/closing-tasks.dto';
import { FindAllTasksDto } from './dto/find-all-tasks.dto';

@ApiTags('Tasks')
@Controller('/api/tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @ApiOperation({ summary: 'Creating a task' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Tasks })
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateTasksDto,
  ): Promise<{ response: Tasks; statusCode: number }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    };
  }

  @ApiOperation({ summary: 'Getting all tasks' })
  @ApiResponse({ status: HttpStatus.OK, type: [Tasks] })
  @Get()
  async findAll(
    @Body() dto: FindAllTasksDto,
  ): Promise<{ response: Tasks[]; statusCode: HttpStatus.OK }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(dto),
    };
  }

  @ApiOperation({ summary: 'Getting task by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Tasks })
  @Get('/:id')
  async findByPk(
    @Param('id') id: number,
  ): Promise<{ response: Tasks; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    };
  }

  @ApiOperation({ summary: 'Getting task by name' })
  @ApiResponse({ status: HttpStatus.OK, type: Tasks })
  @Get('/name/:name')
  async findByName(
    @Param('name') name: string,
  ): Promise<{ response: Tasks; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByName(name),
    };
  }

  @ApiOperation({ summary: 'Updating task' })
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  @UsePipes(ValidationPipe)
  @Put()
  async update(
    @Body() dto: UpdateTasksDto,
  ): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    };
  }

  @ApiOperation({ summary: 'Closing a task' })
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  @UsePipes(ValidationPipe)
  @Put()
  async closing(
    @Body() dto: ClosingTasksDto,
  ): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.closing(dto),
    };
  }

  @ApiOperation({ summary: 'Deleting task' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete('/:id')
  async destroy(
    @Param('id') id: number,
    @Req() request,
  ): Promise<{ response: number; statusCode: number }> {
    const { userID } = request.cookies;
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.destroy({ id, userID }),
    };
  }
}
