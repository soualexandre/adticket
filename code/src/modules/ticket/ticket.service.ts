import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventPrismaGateway } from '../events/gateway/event.prisma.gateway';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TICKET_TYPE_GATEWAY, TicketTypePrismaGateway } from './gateway/ticket.type.gateway';

@Injectable()
export class TicketService {
  constructor(@Inject(TICKET_TYPE_GATEWAY)
  private readonly ticketGateway: TicketTypePrismaGateway,
    private readonly eventGateway: EventPrismaGateway
  ) { }
  async create(createTicketDto: CreateTicketDto) {
    try {
      const event = await this.eventGateway.findOne(createTicketDto.eventId);
      console.log("Event: ", event);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      const ticket = await this.ticketGateway.create(createTicketDto);
      return ticket;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const page = 1;
      const limit = 1000;
      const skip = (page - 1) * limit;
      const take = limit;
      return await this.ticketGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async findOne(id: string) {
    try {
      const ticket = await this.ticketGateway.findOne(id);
      if (!ticket) {
        throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
      }
      return ticket;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      const ticket = await this.ticketGateway.update(id, updateTicketDto);
      if (!ticket) {
        throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
      }
      return ticket;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.ticketGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
