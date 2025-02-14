export interface PaymentDTO {
    id?: number;
    status?: string;
    transaction_amount?: number;
    description?: string;
    payment_method_id?: string;
    qr_code?: string;
    qr_code_base64?: string;
}

export interface GetPaymentDTO {
    id?: string;
    status?: string;
    transaction_amount?: number;
    description?: string;
    payment_method_id?: string;
    qr_code?: string;
    qr_code_base64?: string;
}
