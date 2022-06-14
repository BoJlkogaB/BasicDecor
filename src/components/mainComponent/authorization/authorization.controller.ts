import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { AuthorizationService } from './authorization.service';
import { AuthorizationDto } from './dto/authorization.dto';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { Cookies } from '../../../classes/cookies';
import { passthrough } from '../../../typing/response-setting.types';
import {
  AuthorizationResponse,
  RefreshResponse,
} from '../../../typing/authorization.types';
import { Users } from '../users/models/users.model';

@ApiTags('Authorization and registration')
@Controller('/api')
export class AuthorizationController {
  constructor(private service: AuthorizationService) {}

  @ApiOperation({ summary: 'Log in to user account' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Object })
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(
    @Body() dto: AuthorizationDto,
    @Res(passthrough) response,
  ): Promise<{
    response: AuthorizationResponse;
    statusCode: HttpStatus.CREATED;
  }> {
    const data = await this.service.login(dto);

    Cookies.setRefreshToken(response, data.refreshToken);

    return {
      statusCode: HttpStatus.CREATED,
      response: data,
    };
  }

  @ApiOperation({ summary: 'Registration for users' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Users })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  async registration(
    @Body() dto: CreateUsersDto,
  ): Promise<{ response: Users; statusCode: number }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.registration(dto),
    };
  }

  @ApiOperation({ summary: 'Log out to user account' })
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  @UsePipes(ValidationPipe)
  @Delete('/logout')
  async logout(
    @Req() request,
    @Res(passthrough) response,
  ): Promise<{ response: number; statusCode: HttpStatus.OK }> {
    const { refreshToken } = request.cookies;

    response.clearCookie('refreshToken');

    return {
      statusCode: HttpStatus.OK,
      response: await this.service.logout(refreshToken),
    };
  }

  @ApiOperation({ summary: 'Refresh user refreshToken' })
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  @UsePipes(ValidationPipe)
  @Put('/refresh')
  async refresh(
    @Req() request,
  ): Promise<{ response: RefreshResponse; statusCode: HttpStatus.OK }> {
    const { refreshToken } = request.cookies;
    const data = await this.service.refresh(refreshToken);

    return {
      statusCode: HttpStatus.OK,
      response: data,
    };
  }
}
