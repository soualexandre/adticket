import { PartialType } from '@nestjs/swagger';
import { CreateTicketValidationDto } from './create-ticket-validation.dto';

export class UpdateTicketValidationDto extends PartialType(CreateTicketValidationDto) {}
