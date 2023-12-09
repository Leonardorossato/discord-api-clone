import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ControllerBase } from 'src/core/application/controller.base';
import { FindProfileByIdUseCase } from './find-profile-by-id.usecase';

@Controller('profile')
@ApiTags('Profile')
export class FindProfileByIdController extends ControllerBase {
  constructor(private readonly findProfileByIdUseCase: FindProfileByIdUseCase) {
    super();
  }

  @ApiOperation({ summary: 'Rota para buscar dados dos Perfis pelo Id' })
  @ApiOkResponse({
    status: 200,
    description: 'Perfil encontrado com sucesso',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Usuario não encontrado',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'O corpo da requisição esta errado, confira',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Erro interno na hora de persistir o anuncio',
  })
  @Patch('/:id')
  async update(@Param('id') id: number) {
    const result = await this.findProfileByIdUseCase.findById(id);
    if (result.isFailure) {
      return this.handleErrorResponse(result.error);
    }
    return result.value;
  }
}
