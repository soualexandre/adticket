import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { GUEST_TYPE_GATEWAY, GuestTypePrismaGateway } from './gateway/guest.type.gateway';

@Injectable()
export class GuestsService {

  constructor(
    @Inject(GUEST_TYPE_GATEWAY) private readonly guestGateway: GuestTypePrismaGateway,
  ) { }

  async create(createGuestDto: CreateGuestDto) {
    try {
      const guest = await this.guestGateway.create(createGuestDto);
      if (!guest) {
        throw new HttpException('Guest not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return guest;
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
      return this.guestGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const guest = this.guestGateway.findOne(id);
      if (!guest) {
        throw new HttpException('Guest not found', HttpStatus.NOT_FOUND);
      }
      return guest;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updateGuestDto: UpdateGuestDto) {
    try {
      const guest = this.guestGateway.update(id, updateGuestDto);
      if (!guest) {
        throw new HttpException('Guest not found', HttpStatus.NOT_FOUND);
      }
      return guest;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.guestGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Guest not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}