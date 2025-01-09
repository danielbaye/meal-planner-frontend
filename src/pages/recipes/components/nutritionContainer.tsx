
import { Nutrition, NutritionProps } from "../types/Nutrition.type"
import React from "react"
import NutritionBlob from "./nutritionBlob"
import "../css/NutritionContainer.css"
const NutritionContainer: React.FC<NutritionProps> = (
    {
        nutrition
    }
) => {

    const nutritionDictionary = {
        'calories': nutrition.calories,
        'protein': nutrition.proteinGram,
        'carbs': nutrition.carbsGram,
        'fat': nutrition.fatGram,
        'saturated fat': nutrition.saturatedFatGram,
        'salt': nutrition.saltGram,
    }

    return <div className="d-flex nutrition-container">
        {Object.entries(nutritionDictionary).map((key, value) =>
            <NutritionBlob name={key[0]} total={value} key={value} />
        )}
    </div>

}

export default NutritionContainer