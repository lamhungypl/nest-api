import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { Customer } from './customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends BaseRepository<Customer> {}
