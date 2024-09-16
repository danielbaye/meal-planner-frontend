import React, { ReactNode } from 'react';
import SlidingSidebar from './components/slidingSidebar';
import { TopPicture } from './components/topPicture';
import "./css/MainMenu.css"

interface MainPageProps {
    children: ReactNode; // This type allows any valid React child elements
}


const MainPage: React.FC<MainPageProps> = ({ children }) => {
    return (
        <>
            <TopPicture />
            <div className="main-menu">
                <SlidingSidebar />
                <div className="content">
                    {children}
                </div>
            </div>
        </>
    );
};

export default MainPage;
