import { BaseModel } from '@modules/common/base.model';
import { IsNotEmpty } from 'class-validator';
import { format } from 'date-fns';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stock_status')
export class StockStatus extends BaseModel {
  public getId(): number {
    return this.stockStatusId;
  }

  public getIdField(): string {
    return 'stockStatusId';
  }

  @PrimaryGeneratedColumn({ name: 'stock_status_id' })
  public stockStatusId: number;

  @IsNotEmpty()
  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  }
}
