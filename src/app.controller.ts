import {
  BadRequestException,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesService } from './images/images.service';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';
import { UUID } from 'crypto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageService: ImagesService,
  ) {}

  @Get('users')
  async getAllUsers(@Request() req): Promise<User[]> {
    return await this.appService.getAllUser(req.user);
  }

  @Get('users/details')
  async getAllUsersWithDetails(@Request() req): Promise<User[]> {
    return await this.appService.getAllUsersWithDetails(req.user);
  }

  @Post('upload')
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
    user: User,
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

  @Delete('users/:id')
  async deleteUser(@Param('id') id: UUID, @Request() req): Promise<string> {
    return this.appService.deleteUser(id, req.user);
  }

  @Public()
  @Get('test-me')
  async getTestMe(): Promise<string> {
    return 'Hello from a public route!';
  }
}
