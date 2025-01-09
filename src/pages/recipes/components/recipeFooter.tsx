import { RecipeBlobType } from "../types/RecipeBlob.type";
import { RecipeBlobFooterType } from "../types/RecipeFooter.type";



const RecipeFooter: React.FC<RecipeBlobFooterType> = (
    { timeMinutes,
        skillLevel,
        dishNumber }

) => {

    const skillLevelText = (skillLevel: number) => {

        switch (skillLevel) {

            case 1: return 'easy';
            case 2: return 'intermidiate';
            case 3: return 'advanced';
            case 4: return 'expert';
            default:
                return 'easy';
        }
    }


    return (
        <div className="recipe-footer">
            <div className="footer-item">
                <p className="footer-text">{timeMinutes}</p>
                <i className="bi bi-clock icon-style"></i>
            </div>
            <div className="footer-item">
                <p className="footer-text">{skillLevelText(skillLevel)}</p>
                <i className="bi bi-bar-chart icon-style"></i>
            </div>
            <div className="footer-item">
                <p className="footer-text">{dishNumber}</p>
                <i className="bi bi-people icon-style"></i>
            </div>
        </div>
    )
}

export default RecipeFooter;