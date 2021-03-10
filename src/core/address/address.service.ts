import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base.service';
import { Address } from './address.entity';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService extends BaseService<Address, AddressRepository> {
  constructor(
    @InjectRepository(AddressRepository) repository: AddressRepository,
  ) {
    super(repository);
  }
}
