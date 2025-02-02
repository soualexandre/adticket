import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTicketValidationDto } from './dto/create-ticket-validation.dto';
import { UpdateTicketValidationDto } from './dto/update-ticket-validation.dto';
import { TICKET_VALIDATION_TYPE_GATEWAY, TicketValidationTypePrismaGateway } from './gateway/ticket-validation.type.gateway';

@Injectable()
export class TicketValidationService {

  constructor(
    @Inject(TICKET_VALIDATION_TYPE_GATEWAY) private readonly ticketValidationGateway: TicketValidationTypePrismaGateway,
  ) { }

  async create(createTicketValidationDto: CreateTicketValidationDto) {
    try {
      const ticketValidation = await this.ticketValidationGateway.create(createTicketValidationDto);
      if (!ticketValidation) {
        throw new HttpException('Ticket validation not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return ticketValidation;
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
      return this.ticketValidationGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const ticketValidation = this.ticketValidationGateway.findOne(id);
      if (!ticketValidation) {
        throw new HttpException('Ticket validation not found', HttpStatus.NOT_FOUND);
      }
      return ticketValidation;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updateTicketValidationDto: UpdateTicketValidationDto) {
    try {
      const ticketValidation = this.ticketValidationGateway.update(id, updateTicketValidationDto);
      if (!ticketValidation) {
        throw new HttpException('Ticket validation not found', HttpStatus.NOT_FOUND);
      }
      return ticketValidation;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.ticketValidationGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Ticket validation not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}