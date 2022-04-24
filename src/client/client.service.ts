import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, clientSchemaName } from 'src/models/ClientSchema';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/createClient.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(clientSchemaName) private clientModel: Model<Client>,
  ) {}
  async getAll() {
    const clients = await this.clientModel.find();

    if (!clients) {
      throw new NotFoundException('clients Not Found');
    }

    return {
      data: {
        clients,
      },
      status: HttpStatus.OK,
    };
  }

  async create(createClientDto: CreateClientDto) {
    const client = await new this.clientModel(createClientDto).save();

    return {
      data: {
        client,
      },
      status: HttpStatus.OK,
    };
  }
}
