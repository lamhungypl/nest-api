import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressController } from './controllers/address/address.controller';
import { AddressServices } from './services/address/address.services';

@Module({
  imports: [],
  controllers: [AppController, AddressController],
  providers: [AppService, AddressServices],
})
export class AppModule {}
