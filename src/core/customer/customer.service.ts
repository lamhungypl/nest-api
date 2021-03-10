import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base.service';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService extends BaseService<Customer, CustomerRepository> {
  constructor(
    @InjectRepository(CustomerRepository) repository: CustomerRepository,
  ) {
    super(repository);
  }
}
