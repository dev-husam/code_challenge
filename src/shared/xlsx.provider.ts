import { Injectable } from "@nestjs/common";
import * as XLSX from 'xlsx';
import * as path from 'path';


@Injectable({})
export class XlsxProvider {

    readCsv(filePath: string): any {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: ["id", "deliveryArea", "name", "qty", "brand"] });
    }

    createCsv(data, Heading = [], sheetName = "", fileName = "output.csv") {

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true, });
        XLSX.utils.sheet_add_aoa(ws, [Heading], { origin: 'A1' });
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        const filePath = path.join(process.cwd(), "files", fileName);

        const fileContent = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
        XLSX.writeFile(wb, filePath);

        return fileContent
    }
}