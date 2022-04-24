import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getAll() {
    return this.clientService.getAll();
  }

  @Post('create')
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }
}
