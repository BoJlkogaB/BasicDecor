import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { StatusesService } from './statuses.service';
import { Statuses } from './models/statuses.model';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Statuses')
@Controller('/api/statuses')
export class StatusesController {
  constructor(private service: StatusesService) {}

  @ApiOperation({ summary: 'Creating a status' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Statuses })
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() dto: CreateStatusDto,
  ): Promise<{ response: Statuses; statusCode: number }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.create(dto),
    };
  }

  @ApiOperation({ summary: 'Getting all statuses' })
  @ApiResponse({ status: HttpStatus.OK, type: [Statuses] })
  @Get()
  async findAll(): Promise<{
    response: Statuses[];
    statusCode: number;
  }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findAll(),
    };
  }

  @ApiOperation({ summary: 'Getting status by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Statuses })
  @Get('/:id')
  async findByPk(
    @Param('id') id: number,
  ): Promise<{ response: Statuses; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByPk(id),
    };
  }

  @ApiOperation({ summary: 'Getting status by name' })
  @ApiResponse({ status: HttpStatus.OK, type: Statuses })
  @Get('/name/:name')
  async findByName(
    @Param('name') name: string,
  ): Promise<{ response: Statuses; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByName(name),
    };
  }

  @ApiOperation({ summary: 'Updating status' })
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  @UsePipes(ValidationPipe)
  @Put()
  async update(
    @Body() dto: UpdateStatusDto,
  ): Promise<{ response: number[]; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.update(dto),
    };
  }

  @ApiOperation({ summary: 'Deleting status' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete('/:id')
  async destroy(
    @Param('id') id: number,
  ): Promise<{ response: number; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.destroy(id),
    };
  }
}
