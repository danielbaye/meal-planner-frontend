import { RecipeBlobType } from "../types/RecipeBlob.type";
import RecipeFooter from "./recipeFooter";



const RecipeBlob: React.FC<RecipeBlobType> = (
    { name,
        description,
        imageUrl,
        timeMinutes,
        skillLevel,
        dishNumber }

) => {
    const getFontSize = () => {
        const blobWidth = 300
        const titleLength = name.length;
        const baseFontSize = 1; // Base font size in rem

        // Adjust font size based on the title length and blob width
        const fontSize = Math.max(baseFontSize, blobWidth / (titleLength * 0.5)) + 'px';
        return fontSize;
    }
    return (<div className="recipeBlob">
        <img src={imageUrl} className="recipe-blob-image" alt={name + 'image'} />
        <div className="title-recipe-blob-container">
            <h2 className="title-recipe-blob" >{name}</h2>
        </div>
        <RecipeFooter timeMinutes={timeMinutes} skillLevel={skillLevel} dishNumber={dishNumber} />

    </div>)
}

export default RecipeBlob;