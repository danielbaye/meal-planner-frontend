import React from 'react';
import "./css/MainMenu.css"
import RecipeBlobContainer from './components/recipeBlobContainer';
import MainPage from './mainPage';


const MainMenu: React.FC = () => {
    return (
        <MainPage>
            <RecipeBlobContainer />
        </MainPage>
    );
};

export default MainMenu;
