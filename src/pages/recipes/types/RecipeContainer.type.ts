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

export type Nutrition = {
    calories: number;
    proteinGram: number;
    carbsGram: number;
    fatGram: number;
    saturatedFatGram: number;
    saltGram: number;
}

export type recipeIngridient = {
    name: string;
    quantity: number;
    measurement: string;
    text: string;
}