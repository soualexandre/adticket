import { IsNumber, IsString, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class IdentificationDto {
    @IsString()
    type: string;

    @IsString()
    number: string;
}

class PayerDto {
    @IsEmail()
    email: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @ValidateNested()
    @Type(() => IdentificationDto)
    identification: IdentificationDto;
}

export class CreateMercadoPagoDto {
    @IsNumber()
    transaction_amount: number;

    @IsString()
    description: string;

    @IsString()
    payment_method_id: string;

    @ValidateNested()
    @Type(() => PayerDto)
    payer: PayerDto;
}
