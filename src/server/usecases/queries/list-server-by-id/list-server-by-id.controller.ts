import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ControllerBase } from 'src/core/application/controller.base';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateServerDto } from '../../commands/create-server/create-server.dto';
import { ListServerByIdUseCase } from './list-server-by-id.usecase';

@Controller('servers')
@ApiTags('Servidores')
@ApiBearerAuth()
export class ListServerByIdUseController extends ControllerBase {
  constructor(private readonly listServerByIdUseCase: ListServerByIdUseCase) {
    super();
  }

  @ApiOperation({ summary: 'Rota para Encontrar o Servidor pelo Id' })
  @ApiOkResponse({
    status: 200,
    type: CreateServerDto,
    description: 'Servidor encontrado com sucesso',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Servidor não encontrado',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Erro interno na hora de persistir o servidor',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: number) {
    const result = await this.listServerByIdUseCase.findById(id);
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
