import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CodeService } from './code.service';
import { AvailCodeDto } from './dto/availCode.dto';
import { CreateCodeDto } from './dto/createCode.dto';
import { CreateCodeBatchDto } from './dto/createCodeBatch.dto';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get('')
  getAll(@Query() params: any) {
    return this.codeService.getAll(params.startDate, params.endDate);
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
