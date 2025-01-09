import { Nutrition } from "./Nutrition.type";

export type RecipeContainerType = {
    recipeId: string
}


export type RecipeType = {
    name: string;
    description: string;
    imageUrl: string;
    timeMinutes: number;
    skillLevel: number;
    dishNumber: number;
    tags: string[];
    method: string[];
    ingrieients: recipeIngridient[];
    nutrition: Nutrition
}


export type recipeIngridient = {
    name: string;
    quantity: number;
    measurement: string;
    text: string;
    cost_per_100_gr_ml: number
}