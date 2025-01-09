import { useCallback, useEffect, useState } from "react";
import api from "../../../api";
import { RecipeContainerType, recipeIngridient, RecipeType } from "../types/RecipeContainer.type";
import LoadingModal from "../../../components/loadingModal"
import "../css/RecipeContainer.css"
import NutritionContainer from "./nutritionContainer";
import RecipeFooter from "./recipeFooter";
import { convertQuantity } from "../../../utils/measurements_converter"
// import { calculateIngridientCost } from "utils/costCalculator";

const RecipeContainer: React.FC<RecipeContainerType> = (
    { recipeId }
) => {
    const [isLoading, setIsLoadting] = useState<boolean>(false)
    const [system, setSystem] = useState<'imperial' | 'metric'>('metric')
    const [recipe, setRecipe] = useState<RecipeType | undefined>()

    const loadRecipe = useCallback(async () => {

        setIsLoadting(true)
        try {
            const res = await api.get(`/api/recipes/${recipeId}/`)
            if (res.status == 200) {
                setRecipe(recipeDtoToType(res.data))
            }
        }
        catch (e) {
            alert("failed to get recipe")
            setRecipe(undefined)
        }
        setIsLoadting(false)

    }, [])

    useEffect(() => {
        loadRecipe()
    }, [])

    function handleSystemSwitch(): void {
        if (system == 'imperial')
            setSystem('metric')
        else
            setSystem('imperial')
    }




    return (
        <div className="d-flex flex-column">
            {!isLoading && recipe != undefined &&
                <>
                    <div className="d-flex mb-4">
                        <img src={recipe.imageUrl} className="recipe-image" alt={recipe.name + 'image'} />
                        <div className="title-container mx-3 p-1">
                            <h2 className="title">{recipe.name}</h2>
                            <h3 className="description">{recipe.description}</h3>
                            <div className="mb-4">
                                <RecipeFooter timeMinutes={recipe.timeMinutes} skillLevel={recipe.skillLevel} dishNumber={recipe.dishNumber} />
                            </div>
                            <NutritionContainer nutrition={recipe.nutrition} />
                        </div>

                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="ingridient-container">
                            <h2 className="title m-2">Ingridients</h2>
                            <button className="custom-btn-outline-primary" onClick={handleSystemSwitch}>{system}</button>
                            <div className="container">
                                {recipe.ingrieients.map((ing) => {
                                    const { quantity, measurement } = convertQuantity(ing.quantity, ing.measurement, system)


                                    return (<div className="row ">
                                        <div className="col-sm small-text">
                                            {`${quantity} ${measurement} ${measurement!=''? 'of':''} ${ing.name} ${ing.text}`}
                                        </div>
                                        <div className="col-sm small-text align-self-center">
                                            {calculateIngridientCost(ing).toFixed(2)}
                                        </div>
                                    </div>)
                                })}
                            </div>
                            <span >
                                <div className="small-text mt-2 border-top border-secondary" >
                                    {recipe.ingrieients.reduce((summerize, ing) => summerize + calculateIngridientCost(ing), 0).toFixed(2)}₪ /
                                    / {(recipe.ingrieients.reduce((summerize, ing) => summerize + calculateIngridientCost(ing), 0) / recipe.dishNumber).toFixed(2)}₪ per dish
                                </div>

                            </span>
                        </div>
                        <div className="method-container">
                            <h2 className="title m-2">method</h2>
                            <ul>
                                {recipe.method.map(method =>
                                    <li className="small-text">{method}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-around">
                        {recipe.tags.map(tag =>
                            <a>{tag}</a>
                        )}
                    </div>

                </>
            }
            <LoadingModal show={isLoading} />
        </div>)
}

export default RecipeContainer;

function recipeDtoToType(data: RecipeDTO): RecipeType | undefined {
    try {
        const recipe: RecipeType = {
            name: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            timeMinutes: data.preparationMinutes,
            skillLevel: data.skill_level,
            dishNumber: data.dishNumber,
            tags: data.tags.map(tag => tag.name),
            method: data.methods.map(method => method.text),
            ingrieients: data.recipe_ingredients.map(ing =>
                recipeIngridientToIngridient(ing)),
            nutrition: {
                calories: data.nutrition.calories ?? 0,
                proteinGram: data.nutrition.proteinGram ?? 0,
                carbsGram: data.nutrition.carbsGram ?? 0,
                fatGram: data.nutrition.fatGram ?? 0,
                saturatedFatGram: data.nutrition.saturatedFatGram ?? 0,
                saltGram: data.nutrition.saltGram ?? 0
            }
        }
        return recipe
    }
    catch {
        return undefined
    }
}
function recipeIngridientToIngridient(ing: IngredientDTO): recipeIngridient {
    const recepieIngridient: recipeIngridient = {
        name: ing.ingredient.name,
        quantity: ing.quantity,
        measurement: ing.measurement,
        text: '',
        cost_per_100_gr_ml: ing.ingredient.cost_per_100_gr_ml
    }
    return recepieIngridient

}


function calculateIngridientCost(ing: { quantity: number; measurement: string; cost_per_100_gr_ml: number }) {

    return ing.quantity * ing.cost_per_100_gr_ml * (ing.measurement == 'ml' || ing.measurement == 'g' ? 0.01 : ing.measurement == 'l' || ing.measurement == 'kg' ? 0.1 :
        1)

}