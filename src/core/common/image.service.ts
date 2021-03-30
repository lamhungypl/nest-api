import { Injectable } from '@nestjs/common';

interface ImageServiceImpl {
  imageUpload(...params): any;
}

@Injectable()
export class ImageService implements ImageServiceImpl {
  imageUpload(...params: any[]) {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
export class S3Service implements ImageServiceImpl {
  imageUpload(...params: any[]) {
    throw new Error('Method not implemented.');
  }
}
