import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import CodeSchema, { codeSchemaName } from 'src/models/CodeSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: codeSchemaName, schema: CodeSchema }]),
  ],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
