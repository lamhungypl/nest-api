import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
