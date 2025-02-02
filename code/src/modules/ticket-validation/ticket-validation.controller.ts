import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketValidationService } from './ticket-validation.service';
import { CreateTicketValidationDto } from './dto/create-ticket-validation.dto';
import { UpdateTicketValidationDto } from './dto/update-ticket-validation.dto';

@Controller('ticket-validation')
export class TicketValidationController {
  constructor(private readonly ticketValidationService: TicketValidationService) { }

  @Post()
  create(@Body() createTicketValidationDto: CreateTicketValidationDto) {
    return this.ticketValidationService.create(createTicketValidationDto);
  }

  @Get()
  findAll() {
    return this.ticketValidationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketValidationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketValidationDto: UpdateTicketValidationDto) {
    return this.ticketValidationService.update(id, updateTicketValidationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketValidationService.remove(id);
  }
}
