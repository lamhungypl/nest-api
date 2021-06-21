import { AddressModule } from '@modules/address';
import { BannerModule } from '@modules/banner';
import { CategoryModule } from '@modules/category';
import { CustomerModule } from '@modules/customer';
import { CustomerWishlistModule } from '@modules/customerWishlist';
import { EmailTemplateModule } from '@modules/emailTemplate';
import { LanguageModule } from '@modules/language';
import { ManufactureModule } from '@modules/manufacture';
import { MediaModule } from '@modules/media';
import { OrderModule } from '@modules/order';
import { OrderStatusModule } from '@modules/order-status';
import { PageModule } from '@modules/page';
import { ProductModule } from '@modules/product';
import { ProductDiscountModule } from '@modules/product-discount';
import { ProductImageModule } from '@modules/product-image';
import { ProductSpecialModule } from '@modules/product-special';
import { RoleModule } from '@modules/role';
import { SettingModule } from '@modules/setting';
import { UserModule } from '@modules/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    ProductImageModule,
    ProductDiscountModule,
    ProductSpecialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
