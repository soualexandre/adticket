import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'User name' })
    name: string;

    @ApiProperty({ description: 'User email', format: 'email' })
    email: string;

    @ApiProperty({ description: 'User phone number', format: 'phone' })
    phoneNumber: string;

    @ApiProperty({ description: 'User password', minLength: 8, format: 'password' })
    password: string;
}