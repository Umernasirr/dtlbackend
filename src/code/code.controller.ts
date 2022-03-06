import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/createCode.dto';
import { CreateCodeBatchDto } from './dto/createCodeBatch.dto';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get('')
  getAll() {
    return this.codeService.getAll();
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
  availCode(@Body() body) {
    return this.codeService.availCode(body.codeId);
  }

  @Post('unavail')
  unavailCode(@Body() body) {
    return this.codeService.unavailCode(body.codeId);
  }
}
