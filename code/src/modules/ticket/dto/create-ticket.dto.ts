import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
    @ApiProperty({ description: 'Event ID' })
    eventId: string;
    @ApiProperty({ description: 'Batch ID' })
    batchId: string;
    @ApiProperty({ description: 'User ID' })
    userId: string;
    @ApiProperty({ description: 'Price' })
    price: number;
    @ApiProperty({ description: 'Quantity' })
    quantity: number;
    @ApiProperty({ description: 'Total Price' })
    totalPrice: number;
}
