import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CodeService } from './code.service';
import { AvailCodeDto } from './dto/availCode.dto';
import { CreateCodeDto } from './dto/createCode.dto';
import { CreateCodeBatchDto } from './dto/createCodeBatch.dto';

@Controller('code')
export class CodeController {
  constructor(
    private readonly codeService: CodeService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  async getAll(@Query() params: any) {
    const clientsData = await this.userService.getUser(params.userId);

    if (clientsData.data.user.clients) {
      return this.codeService.getAll(
        clientsData.data.user.clients,
        params.startDate,
        params.endDate,
      );
    } else {
      return new NotFoundException('Client for user not found');
    }
  }

  @Get('/availed')
  getAllAvailedCodes() {
    return this.codeService.getAllAvailed();
  }

  @Get('/:id')
  GetAllByProduct(@Param('id') productId: string) {
    return this.codeService.getAllByProduct(productId);
  }

  @Post('create')
  createCode(@Body() createCodeDto: CreateCodeDto) {
    return this.codeService.createCode(createCodeDto);
  }

  @Post('createBatch')
  createMultipleCode(@Body() createCodeBatchDto: CreateCodeBatchDto) {
    return this.codeService.createCodeBatch(createCodeBatchDto);
  }

  @Post('avail')
  availCode(@Body() body: AvailCodeDto) {
    return this.codeService.availCode(body.profileId, body.userId, body.codeId);
  }

  @Post('unavail')
  unavailCode(@Body() body: AvailCodeDto) {
    return this.codeService.unavailCode(body.codeId);
  }
}
