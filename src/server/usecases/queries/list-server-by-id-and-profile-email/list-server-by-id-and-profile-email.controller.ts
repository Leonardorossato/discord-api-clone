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
import { ListServerByIdAndProfileEmailUseCase } from './list-server-by-id-and-profile-email.usecase';

@Controller('servers')
@ApiTags('Servidores')
@ApiBearerAuth()
export class ListServerByIdAndProfileEmailUseController extends ControllerBase {
  constructor(
    private readonly listServerByIdAndProfileEmailUseCase: ListServerByIdAndProfileEmailUseCase,
  ) {
    super();
  }

  @ApiOperation({
    summary: 'Rota para Encontrar o Servidor pelo Id e pelo email do Usuario',
  })
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
  @Get('/:id/profile/:email')
  async findById(@Param('id') id: number, @Param('email') email: string) {
    const result =
      await this.listServerByIdAndProfileEmailUseCase.findByIdAndProfileEmail(
        id,
        email,
      );
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
