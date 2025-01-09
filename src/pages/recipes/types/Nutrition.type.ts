
export type Nutrition = {
    calories: number;
    proteinGram: number;
    carbsGram: number;
    fatGram: number;
    saturatedFatGram: number;
    saltGram: number;
}

export type NutritionProps = {
    nutrition: Nutrition
}