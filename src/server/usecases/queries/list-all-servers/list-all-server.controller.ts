import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ControllerBase } from 'src/core/application/controller.base';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ListAllServerUsecase } from './list-all-server.uscease';
import { CreateServerDto } from '../../commands/create-server/create-server.dto';

@Controller('servers')
@ApiTags('Servidores')
@ApiBearerAuth()
export class ListAllServerUseController extends ControllerBase {
  constructor(private readonly listAllServerUseCase: ListAllServerUsecase) {
    super();
  }

  @ApiOperation({ summary: 'Rota para Encontrar todos os Servidores' })
  @ApiOkResponse({
    status: 200,
    type: CreateServerDto,
    description: 'Servidor encontrado com sucesso',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Erro interno na hora de persistir o servidor',
  })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async findAll() {
    const result = await this.listAllServerUseCase.findAll();
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
