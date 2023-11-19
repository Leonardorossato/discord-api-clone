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
import { ListServerByProfileEmailUseCase } from './list-server-by-profile-email.usecase';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('servers')
@ApiTags('Servidores')
@ApiBearerAuth()
export class ListServerByProfileEmailUseCaseController extends ControllerBase {
  constructor(
    private readonly listServerByProfileEmailUseCase: ListServerByProfileEmailUseCase,
  ) {
    super();
  }

  @ApiOperation({
    summary: 'Rota para Encontrar o Servidor pelo email do Usuario',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Servidor pelo email do profile encontrado com sucesso',
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
  @Get('/profile/:email')
  async findById(@Param('email') email: string) {
    const result =
      await this.listServerByProfileEmailUseCase.findServerByProfileEmail(
        email,
      );
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
