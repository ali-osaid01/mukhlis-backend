export class CreateCategoryDto {
    name: string;
}

export class UpdateCategoryDto {
    name: string;
}

export class SubCategoryDto {
    name: string;
    category: string;
}