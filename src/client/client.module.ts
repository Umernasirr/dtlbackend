import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ClientSchema, { clientSchemaName } from 'src/models/ClientSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: clientSchemaName, schema: ClientSchema },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
