import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoProvider } from './mercado-pago';

@Module({
  imports: [HttpModule],
  providers: [MercadoPagoService, MercadoPagoProvider],
  exports: [MercadoPagoService]
})
export class MercadoPagoModule { }
