import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketLinksService } from './ticket-link.service';
import { CreateTicketLinkDto } from './dto/create-ticket-link.dto';
import { UpdateTicketLinkDto } from './dto/update-ticket-link.dto';

@Controller('ticket-link')
export class TicketLinkController {
  constructor(private readonly ticketLinkService: TicketLinksService) { }

  @Post()
  create(@Body() createTicketLinkDto: CreateTicketLinkDto) {
    return this.ticketLinkService.create(createTicketLinkDto);
  }

  @Get()
  findAll() {
    return this.ticketLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketLinkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketLinkDto: UpdateTicketLinkDto) {
    return this.ticketLinkService.update(id, updateTicketLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketLinkService.remove(id);
  }
}
