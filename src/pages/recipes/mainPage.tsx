import React, { ReactNode } from 'react';
import SlidingSidebar from './components/slidingSidebar';
import "./css/MainMenu.css"
import NavBar from '../../components/topNavBar';

interface MainPageProps {
    children: ReactNode; // This type allows any valid React child elements
}


const MainPage: React.FC<MainPageProps> = ({ children }) => {
    return (
        <>
            <NavBar isLoggedIn={false} />
            <div className="main-menu">
                {/* <SlidingSidebar /> */}
                <div className="content">
                    {children}
                </div>
            </div>
        </>
    );
};

export default MainPage;
