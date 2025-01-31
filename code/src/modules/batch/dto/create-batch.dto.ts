
import { ApiProperty } from '@nestjs/swagger';

export class CreateBatchDto {
    @ApiProperty({ description: 'Event ID' })
    eventId: string;

    @ApiProperty({ description: 'price' })
    price: number;

    @ApiProperty({ description: 'quantity' })
    quantity: number;
}
