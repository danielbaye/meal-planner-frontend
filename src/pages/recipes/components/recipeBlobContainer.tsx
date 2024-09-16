import React, { useCallback, useEffect, useState } from "react";
import RecipeBlob from "./recipeBlob";
import { RecipeBlobContainerType } from "../types/RecipeBlobContainer.type";
import "../css/RecipeBlob.css"
import api from "../../../api";
import LoadingModal from "../../../components/loadingModal"
import { useNavigate } from "react-router-dom";

const RecipeBlobContainer: React.FC<RecipeBlobContainerType> = () => {

    const [isLoading, setIsLoadting] = useState<boolean>(false)
    const [loadedAll, setLoadedAll] = useState<boolean>(false)
    const [recipes, setRecipes] = useState<SimplifiedRecipeDTO[]>([])
    const [lastRecipeId, setLastRecipeId] = useState<number>(0)
    const paginationPerLoad = 10;

    const loadRecipes = useCallback(async (lastId: number, recipes: SimplifiedRecipeDTO[]) => {
        if (isLoading)
            return
        setIsLoadting(true)

        try {
            const res = await api.get(`/api/recipes/?lastId=${lastId}&num_to_load=${paginationPerLoad}`)
            if (res.status == 200) {
                const new_recipe_list: SimplifiedRecipeDTO[] = res.data
                setRecipes(recipes.concat(new_recipe_list))
                const new_lastRecipeId = Math.max(Math.max(...(new_recipe_list.map(r => parseInt(r.id)))))
                setLastRecipeId(new_lastRecipeId)
                if (res.data.length < paginationPerLoad)
                    setLoadedAll(true)
            }
        }
        catch (e) {
            console.log(e)
            alert("failed to get recipes")
            setRecipes(recipes)
        }
        setIsLoadting(false)
    }, [])

    useEffect(() => {
        if (!loadedAll) {
            loadRecipes(lastRecipeId, recipes)
        }
    }, [loadRecipes])



    const handleScroll = () => {
        const scrollPrecentage = scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        if (scrollPrecentage == 1 && !loadedAll) {
            loadRecipes(lastRecipeId, recipes)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastRecipeId, recipes]);


    const navigate = useNavigate();
    const handleNaviage = (id: string) => {
        navigate(`/recipe/${id}`)
    }


    return <>


        <div className="recipe_container d-flex flex-row  justify-content-between">
            {
                recipes.map(recipe =>
                    <button className="blob" onClick={() => handleNaviage(recipe.id)}>
                        <RecipeBlob
                            name={recipe.title}
                            description={recipe.description}
                            imageUrl={recipe.imageUrl}
                            timeMinutes={recipe.preparationMinutes}
                            skillLevel={recipe.skill_level}
                            dishNumber={recipe.dishNumber}
                        />
                    </button>
                )
            }


            <LoadingModal show={isLoading} />
        </div>
        <div className="footer d-flex justify-content-center">
            <p className="footer-pill">
                Load more Recipes
            </p>
        </div>

    </>


}

export default RecipeBlobContainer