import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { XlsxProvider } from 'src/shared/xlsx.provider';

@Module({
    controllers: [CsvController],
    providers: [CsvService, XlsxProvider]

})
export class CsvModule { }
