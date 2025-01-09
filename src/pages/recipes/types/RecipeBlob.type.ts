import { RecipeBlobFooterType } from "./RecipeFooter.type";

export interface RecipeBlobType extends RecipeBlobFooterType {
    name: string;
    description: string;
    imageUrl: string;
} 