import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EVENT_TYPE_GATEWAY, EventTypePrismaGateway } from './gateway/event.type.gateway';

@Injectable()
export class EventsService {

  constructor(
    @Inject(EVENT_TYPE_GATEWAY) private readonly eventGateway: EventTypePrismaGateway,
  ) { }
  async create(createEventDto: CreateEventDto) {
    try {
      const event = await this.eventGateway.create(createEventDto);
      if (!event) {
        throw new HttpException('User not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return event;
    } catch (error) {

    }
  }

  findAll() {
    try {
      const page = 1;
      const limit = 1000;
      const skip = (page - 1) * limit;
      const take = limit;
      return this.eventGateway.findAll(skip, take);

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const event = this.eventGateway.findOne(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return event;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    try {
      const event = this.eventGateway.update(id, updateEventDto);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return event;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.eventGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
