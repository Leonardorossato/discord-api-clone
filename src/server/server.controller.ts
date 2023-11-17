import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('services')
@ApiTags('services')
export class ServerController{
    @ApiOperation({ summary: 'Hello World' })
    @Get('')
    async hello() {
      return 'hello';
    }
}
  