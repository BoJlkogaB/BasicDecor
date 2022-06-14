import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InitializerService } from './initializer.service';

@ApiTags('Initializer')
@Controller('/api/initializer')
export class InitializerController {
  constructor(private service: InitializerService) {}

  @ApiOperation({ summary: 'Initialization of the project' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async initialization(): Promise<{ statusCode: number }> {
    await this.service.initialization();
    return { statusCode: HttpStatus.OK };
  }
}
