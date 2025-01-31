import { CreateBatchDto } from "../dto/create-batch.dto";
import { PaginateBatchOutputDto } from "../dto/paginate-batch,dto";
import { UpdateBatchDto } from "../dto/update-batch.dto";
import { WhereBatchDto } from "../dto/where-batch.dto";
import { BatchEntity } from "../entities/batch.entity";

export const BATCH_TYPE_GATEWAY = 'BATCH_TYPE_GATEWAY';

export interface BatchTypePrismaGateway {
    create(createUserDto: CreateBatchDto): Promise<BatchEntity>;
    findAll(skip: number, take: number, where?: WhereBatchDto): Promise<PaginateBatchOutputDto>
    findOne(id: string, where?: WhereBatchDto): Promise<BatchEntity>;
    update(
        id: string,
        updateAdministratorDto: UpdateBatchDto,
        where?: WhereBatchDto,
    ): Promise<BatchEntity>;
    remove(id: string): Promise<boolean>;
}
