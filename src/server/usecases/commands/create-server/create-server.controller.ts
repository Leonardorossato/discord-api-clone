import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ControllerBase } from 'src/core/application/controller.base';
import { CreateServerUsecase } from './create-server.usecase';
import { CreateServerDto } from './create-server.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('servers')
@ApiTags('Servidores')
@ApiBearerAuth()
export class CreateServerController extends ControllerBase {
  constructor(private readonly createServerUseCase: CreateServerUsecase) {
    super();
  }

  @ApiOperation({ summary: 'Rota de Criar um Servidor' })
  @ApiCreatedResponse({
    status: 201,
    type: CreateServerDto,
    description: 'Servidor criado com sucesso',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'O corpo da requisição esta errado, confira',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Erro interno na hora de persistir o servidor',
  })
  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() data: CreateServerDto) {
    const result = await this.createServerUseCase.execute(data);
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
