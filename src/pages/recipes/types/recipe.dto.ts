// Ingredient DTO
interface IngredientDTO {
    id: number;
    ingredient: {
        name: string;
        externalId: string;
        imageUrl: string;
    };
    quantity: number;
    measurement: string;
    text: string[];
    recipe: number;
}

// Method DTO
interface MethodDTO {
    step: number;
    text: string;
}

// Tag DTO
interface TagDTO {
    name: string;
}

// Nutrition DTO
interface NutritionDTO {
    calories: number;
    proteinGram: number;
    carbsGram: number;
    fatGram: number;
    saturatedFatGram: number;
    saltGram: number;
}

// Main Recipe DTO
interface RecipeDTO {
    title: string;
    description: string;
    dishNumber: number;
    preparationMinutes: number;
    methods: MethodDTO[];
    recipe_ingredients: IngredientDTO[];
    nutrition: NutritionDTO;
    tags: TagDTO[];
    imageUrl: string;
    origUrl: string;
    skill_level: number;
}

interface SimplifiedRecipeDTO {
    id: string;
    title: string;
    description: string;
    dishNumber: number;
    preparationMinutes: number;
    imageUrl: string;
    skill_level: number;
}
