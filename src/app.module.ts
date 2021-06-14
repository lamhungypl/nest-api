import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AddressModule } from './core/address/address.module';
import { BannerModule } from '@modules/banner/banner.module';
import { CategoryModule } from '@modules/category/category.module';
import { ProductModule } from '@modules/product/product.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { CustomerWishlistModule } from '@modules/customerWishlist/customer-wishlist.module';
import { EmailTemplateModule } from '@modules/emailTemplate/email-template.module';
import { LanguageModule } from '@modules/language/language.module';
import { ManufactureModule } from '@modules/manufacture/manufacture.module';

import { MediaModule } from '@modules/media/media.module';
import { OrderModule } from '@modules/order/order.module';
import { OrderStatusModule } from '@modules/order-status/order-status.module';
import { PageModule } from '@modules/page/page.module';
import { RoleModule } from '@modules/role/role.module';
import { SettingModule } from '@modules/setting/setting.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AddressModule,
    BannerModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    CustomerWishlistModule,
    EmailTemplateModule,
    LanguageModule,
    ManufactureModule,
    MediaModule,
    OrderModule,
    OrderStatusModule,
    PageModule,
    RoleModule,
    SettingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
