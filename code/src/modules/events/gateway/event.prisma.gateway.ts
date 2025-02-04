import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { WhereEventDto } from '../dto/where-event-dto';
import { PaginateEventOutputDto } from '../dto/paginate-event-dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventTypePrismaGateway } from './event.type.gateway';
import { EventEntity } from '../entities/event.entity';
export interface CustomEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: Date;
  image: string;
  batches: any;
  tickets: any;
}

@Injectable()
export class EventPrismaGateway implements EventTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    const event = await this.prisma.event.create({
      data: {
        ...createEventDto,
      },
    });
    return this.mapToEventEntity(event);
  }
  async findAll(skip: number, take: number, where?: WhereEventDto): Promise<PaginateEventOutputDto> {
    const events = await this.prisma.event.findMany({
      skip,
      take,
      where,
      include: {
        tickets: {
          include: {
            event: true,
            batch: true,
          },
        },
      },
    });

    const totalItems = await this.prisma.event.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: events.map(event => this.mapToEventEntity(event)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }



  async findOne(id: string): Promise<EventEntity> {
    const event = await this.prisma.event.findFirst({
      where: { id },
    });
    return this.mapToEventEntity(event);
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<EventEntity> {
    const event = await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
      include: {
        tickets: {
          include: {
            event: true,
            batch: true,
          },
        },
      },
    });

    return this.mapToEventEntity(event);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.event.delete({
      where: { id },
    });

    return true;
  }

  private mapToEventEntity(event: any): EventEntity {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      image: event.image,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}

