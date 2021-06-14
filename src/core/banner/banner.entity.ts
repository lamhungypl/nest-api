import { BaseModel } from '@modules/common/base.model';
import { format } from 'date-fns';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('banner')
export class Banner extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'banner_id' })
  public bannerId: number;

  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'sort_order' })
  public sortOrder: number;

  @Column({ name: 'url' })
  public url: string;

  @Column({ name: 'link' })
  public link: string;

  @Column({ name: 'content' })
  public content: string;

  @Column({ name: 'position' })
  public position: number;

  @Column({ name: 'banner_group_id', default: 0, nullable: true })
  public bannerGroupId: number;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'image_path' })
  public imagePath: string;

  @Column({ name: 'container_name' })
  public containerName: string;

  @Column({ name: 'view_page_count' })
  public viewPageCount: number;

  @Column({ name: 'is_active' })
  public isActive: number;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
