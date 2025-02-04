import { LinkStatus } from "@prisma/client";

export class WhereTicketLinkDto {
    id: string;
    status: LinkStatus;
}