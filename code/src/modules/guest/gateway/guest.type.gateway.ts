import { CreateGuestDto } from '../dto/create-guest.dto';
import { PaginateGuestOutputDto } from '../dto/paginate-guest.dto';
import { UpdateGuestDto } from '../dto/update-guest.dto';
import { WhereGuestDto } from '../dto/where-guest.dto';
import { GuestEntity } from '../entities/guest.entity';

export const GUEST_TYPE_GATEWAY = 'GUEST_TYPE_GATEWAY';

export interface GuestTypePrismaGateway {
    create(createGuestDto: CreateGuestDto): Promise<GuestEntity>;
    findAll(skip: number, take: number, where?: WhereGuestDto): Promise<PaginateGuestOutputDto>;
    findOne(id: string, where?: WhereGuestDto): Promise<GuestEntity>;
    update(
        id: string,
        updateGuestDto: UpdateGuestDto,
        where?: WhereGuestDto,
    ): Promise<GuestEntity>;
    remove(id: string): Promise<boolean>;
}