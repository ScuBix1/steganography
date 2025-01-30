import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth/decorators/user.decorator';
import { Public } from './auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesService } from './images/images.service';
import path from 'path';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageService: ImagesService,
  ) {}

  @Get()
  async getHello(@User() user): Promise<string> {
    return await this.appService.getHello(user.id);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./src/assets`,
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
          cb(null, `modified-${file.originalname}`)
        },
      }),
    }),
  )
  uploadFile(
    @User() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png|image/jpeg' }),
        ],
        exceptionFactory: (errors) =>
          new BadRequestException(
            'Format de fichier incorrect [format accepté: jpeg ou png].',
          ),
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.imageService.create(file, user);
  }

  @Public()
  @Get('test-me')
  async getTestMe(): Promise<string> {
    return 'Hello from a public route!';
  }
}
