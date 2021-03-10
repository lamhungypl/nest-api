import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { Address } from './address.entity';

@EntityRepository(Address)
export class AddressRepository extends BaseRepository<Address> {}
