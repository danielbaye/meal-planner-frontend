import { useState, useEffect } from "react";
import topImage from "../../../assets/rustic-bread--beer--olives--a-whisk--more-foodstuf.svg"



export function TopPicture() {

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <div className="svg-frame">
        <img src={topImage} alt="Food SVG" className="svg-image"
            style={{ transform: `translateY(${Math.max(-0.7, Math.min(-0.2, -(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 0.5 - 0.2)) * 100}%)` }}
        />
    </div>
}