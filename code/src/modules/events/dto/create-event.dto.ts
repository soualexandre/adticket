import { ApiProperty } from '@nestjs/swagger';
export class CreateEventDto {
    @ApiProperty({ description: 'Title' })
    title: string;
    @ApiProperty({ description: 'Description' })
    description: string;
    @ApiProperty({ description: 'Date' })
    date: Date;
    @ApiProperty({ description: 'Start Time' })
    startTime: Date;
    @ApiProperty({ description: 'Image URL' })
    image: string;
}
