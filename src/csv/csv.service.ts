import { Injectable } from '@nestjs/common';


import { XlsxProvider } from 'src/shared/xlsx.provider';
interface jsonDataType {
    name: string
    id: number
    qty: number
    brand: string
    deliveryArea: string
}

@Injectable()
export class CsvService {



    constructor(private readonly xlsxService: XlsxProvider) {

    }

    async proccessCsvFile(file: Express.Multer.File) {
        const jsonData: jsonDataType[] = this.xlsxService.readCsv(file.path)

        const avgData = await this.generateAverageQty(jsonData)
        const poularBrandData = await this.generateMostPopularBrandFile(jsonData, file.originalname)

        this.xlsxService.createCsv(avgData, ["Name", "Average_Quantity"], "sheet1", `0_${file.originalname}`)
        this.xlsxService.createCsv(poularBrandData, ["Name", "Most_Popular_Brand"], "sheet1", `1_${file.originalname}`)

        return { avgData, poularBrandData }
    }

    async generateAverageQty(data: jsonDataType[]) {
        const tempData = new Map<string, { totalQty: number, orderCount: number }>()

        data.map((el) => {
            if (!tempData.has(el.name)) {
                tempData.set(el.name, { totalQty: 0, orderCount: 0 })
            }
            const productInfo = tempData.get(el.name)!;
            productInfo.totalQty += el.qty;
            productInfo.orderCount += 1;

        })

        const avgData = Array.from(tempData.entries()).map(([productName, data]) => ({
            Name: productName,
            'Average Quantity': (data.totalQty / data.orderCount).toFixed(3),
        }));
        return avgData
    }

    private generateMostPopularBrandFile(data: jsonDataType[], originalName: string) {
        const productData = new Map<string, Map<string, number>>();

        // Aggregate data for most popular brand
        data.forEach((row) => {
            const { name: productName, brand } = row;

            if (!productData.has(productName)) {
                productData.set(productName, new Map<string, number>());
            }

            const brandData = productData.get(productName)!;
            brandData.set(brand, (brandData.get(brand) || 0) + 1);
        });

        // Prepare data for CSV
        const brandData = Array.from(productData.entries()).map(([productName, brands]) => {
            const mostPopularBrand = [...brands.entries()].reduce(
                (mostPopular, current) =>
                    current[1] > mostPopular.count
                        ? { brand: current[0], count: current[1] }
                        : mostPopular,
                { brand: '', count: 0 }
            ).brand;

            return { Name: productName, 'Most Popular Brand': mostPopularBrand };
        });

        return brandData

    }

}

