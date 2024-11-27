import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    name: string

    @IsString()
    descriptions: string

    @IsNumber()
    qty: number

    @IsOptional()
    @IsBoolean()
    isActive: number

}
