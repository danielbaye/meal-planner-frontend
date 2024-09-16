import { RecipeBlobType } from "../types/RecipeBlob.type";



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
            {/* <h3 className="description-recipe-blob">{description}</h3> */}
        </div>
        <div className="recipe-footer">
            <div className="footer-item">
                <p className="footer-text">{timeMinutes}</p>
                <i className="bi bi-clock icon-style"></i>
            </div>
            <div className="footer-item">
                <p className="footer-text">{skillLevel}</p>
                <i className="bi bi-bar-chart icon-style"></i>
            </div>
            <div className="footer-item">
                <p className="footer-text">{dishNumber}</p>
                <i className="bi bi-people icon-style"></i>
            </div>
        </div>

    </div>)
}

export default RecipeBlob;