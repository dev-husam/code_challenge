import { Controller, HttpException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CsvService } from './csv.service';

@Controller('csv')
export class CsvController {
    constructor(private readonly csvService: CsvService) { }

    @Post("upload")
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files', // Directory to save the file
                filename: (req, file, cb) => {
                    // Customize the file name
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const fileName = `${uniqueSuffix}-${file.originalname}`;
                    cb(null, fileName);
                },
            }),
            fileFilter: (req, file, cb) => {
                // Validate file type
                if (file.mimetype !== 'text/csv') {
                    return cb(new Error('Only CSV files are allowed'), false);
                }
                cb(null, true);
            },
            limits: { fileSize: 5 * 1024 * 1024 },
        }),
    )
    async fileUpload(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new HttpException("not found", 400)
        return this.csvService.proccessCsvFile(file)
    }
}
