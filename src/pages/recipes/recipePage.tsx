import React from 'react';
import "./css/MainMenu.css"
import MainPage from './mainPage';
import RecipeContainer from './components/recipeContainer';
import { useParams } from 'react-router-dom';
import { NotFound } from '../NotFound'


const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <MainPage>
            {id && <RecipeContainer recipeId={id} />}
            {!id && <NotFound />}

        </MainPage>
    );
};

export default RecipePage;
