import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTicketLinkDto } from './dto/create-ticket-link.dto';
import { UpdateTicketLinkDto } from './dto/update-ticket-link.dto';
import { TICKET_LINK_TYPE_GATEWAY, TicketLinkTypePrismaGateway } from './gateway/ticketLink.type.gateway';

@Injectable()
export class TicketLinksService {

  constructor(
    @Inject(TICKET_LINK_TYPE_GATEWAY) private readonly ticketLinkGateway: TicketLinkTypePrismaGateway,
  ) { }

  async create(createTicketLinkDto: CreateTicketLinkDto) {
    try {
      const ticketLink = await this.ticketLinkGateway.create(createTicketLinkDto);
      if (!ticketLink) {
        throw new HttpException('Ticket link not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return ticketLink;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    try {
      const page = 1;
      const limit = 1000;
      const skip = (page - 1) * limit;
      const take = limit;
      return this.ticketLinkGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const ticketLink = this.ticketLinkGateway.findOne(id);
      if (!ticketLink) {
        throw new HttpException('Ticket link not found', HttpStatus.NOT_FOUND);
      }
      return ticketLink;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updateTicketLinkDto: UpdateTicketLinkDto) {
    try {
      const ticketLink = this.ticketLinkGateway.update(id, updateTicketLinkDto);
      if (!ticketLink) {
        throw new HttpException('Ticket link not found', HttpStatus.NOT_FOUND);
      }
      return ticketLink;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.ticketLinkGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Ticket link not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}