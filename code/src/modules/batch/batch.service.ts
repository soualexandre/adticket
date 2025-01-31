import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BATCH_TYPE_GATEWAY, BatchTypePrismaGateway } from './gateway/batch.type.gateway';

@Injectable()
export class BatchService {
  constructor(@Inject(BATCH_TYPE_GATEWAY) private readonly batchGateway: BatchTypePrismaGateway) { }

  async create(createBatchDto: CreateBatchDto) {
    try {
      const ticket = await this.batchGateway.create(createBatchDto);
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
      return await this.batchGateway.findAll(skip, take);

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const batch = await this.batchGateway.findOne(id);
      if (!batch) {
        throw new HttpException('Batch not found', HttpStatus.NOT_FOUND);
      }
      return batch;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateBatchDto: UpdateBatchDto) {
    try {
      const batch = await this.batchGateway.update(id, updateBatchDto);
      if (!batch) {
        throw new HttpException('Batch not found', HttpStatus.NOT_FOUND);
      }
      return batch;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.batchGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Batch not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
