import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateTicketValidationDto } from '../dto/create-ticket-validation.dto';
import { UpdateTicketValidationDto } from '../dto/update-ticket-validation.dto';
import { TicketValidationsEntity } from '../entities/ticket-validation.entity';
import { TicketValidationTypePrismaGateway } from './ticket-validation.type.gateway';
import { PaginateTicketValidationOutputDto } from '../dto/paginate-ticket-link.dto';
import { WhereTicketValidationDto } from '../dto/where-ticket-link.dto';

@Injectable()
export class TicketValidationPrismaGateway implements TicketValidationTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTicketValidationDto: CreateTicketValidationDto): Promise<TicketValidationsEntity> {
    const ticketValidation = await this.prisma.ticketValidation.create({
      data: {
        ...createTicketValidationDto,
      },
      include: {
        ticket: true
      },
    });

    return this.mapToTicketValidationsEntity(ticketValidation);
  }

  async findAll(skip: number, take: number, where?: WhereTicketValidationDto): Promise<PaginateTicketValidationOutputDto> {
    const ticketValidations = await this.prisma.ticketValidation.findMany({
      skip,
      take,
      where,
      include: {
        ticket: true
      },
    });

    const totalItems = await this.prisma.ticketValidation.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: ticketValidations.map(ticketValidation => this.mapToTicketValidationsEntity(ticketValidation)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }

  async findOne(id: string): Promise<TicketValidationsEntity> {
    const ticketValidation = await this.prisma.ticketValidation.findUnique({
      where: { id },
      include: {
        ticket: true
      },
    });

    if (!ticketValidation) {
      throw new Error('Ticket validation not found');
    }

    return this.mapToTicketValidationsEntity(ticketValidation);
  }

  async update(id: string, updateTicketValidationDto: UpdateTicketValidationDto): Promise<TicketValidationsEntity> {
    const ticketValidation = await this.prisma.ticketValidation.update({
      where: { id },
      data: updateTicketValidationDto,
      include: {
        ticket: true
      },
    });

    return this.mapToTicketValidationsEntity(ticketValidation);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.ticketValidation.delete({
      where: { id },
    });

    return true;
  }

  private mapToTicketValidationsEntity(ticketValidation: any): TicketValidationsEntity {
    return {
      id: ticketValidation.id,
      ticketId: ticketValidation.ticketId,
      location: ticketValidation.location,
      validatedAt: ticketValidation.validatedAt,
      method: ticketValidation.method,
      createdAt: ticketValidation.createdAt,
      updatedAt: ticketValidation.updatedAt,
      ticket: ticketValidation.ticket,
    };
  }
}