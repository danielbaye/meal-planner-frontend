import { useCallback, useEffect, useState } from "react";
import api from "../../../api";
import { RecipeContainerType, recipeIngridient, RecipeType } from "../types/RecipeContainer.type";
import LoadingModal from "../../../components/loadingModal"
import "../css/RecipeContainer.css"

const RecipeContainer: React.FC<RecipeContainerType> = (
    { recipeId }
) => {
    const [isLoading, setIsLoadting] = useState<boolean>(false)
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
    }, [loadRecipe])

    return (

        <div className="d-flex flex-column">
            {!isLoading && recipe != undefined &&
                <>
                    <div className="d-flex ">
                        <img src={recipe.imageUrl} className="recipe-image" alt={recipe.name + 'image'} />
                        <div className="title-container">
                            <h2 className="title">{recipe.name}</h2>
                            <h3 className="description">{recipe.description}</h3>
                        </div>

                    </div>
                    <div className="recipe-footer">
                        <div className="footer-item">
                            <p className="footer-text">{recipe.timeMinutes}</p>
                            <i className="bi bi-clock icon-style"></i>
                        </div>
                        <div className="footer-item">
                            <p className="footer-text">{recipe.skillLevel}</p>
                            <i className="bi bi-bar-chart icon-style"></i>
                        </div>
                        <div className="footer-item">
                            <p className="footer-text">{recipe.dishNumber}</p>
                            <i className="bi bi-people icon-style"></i>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="ingridient-container">
                            <ul>
                                {recipe.ingrieients.map(ing =>
                                    <li>{`${ing.quantity} ${ing.measurement} of ${ing.name} ${ing.text}`}</li>
                                )}
                            </ul>
                        </div>
                        <div className="method-container">
                            <ul>
                                {recipe.method.map(method =>
                                    <li>{method}</li>
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
        text: ''
    }
    return recepieIngridient

}

