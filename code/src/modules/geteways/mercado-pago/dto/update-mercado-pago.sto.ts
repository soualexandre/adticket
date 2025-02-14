import { IsString, IsOptional } from 'class-validator';

export class UpdateMercadoPagoDto {
    @IsOptional()
    @IsString()
    status?: string;
}
