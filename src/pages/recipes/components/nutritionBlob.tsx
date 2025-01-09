
const NutritionBlob: React.FC<{ name: string, total: number }> = (
    { name,
        total
    }
) => {


    return <div className='nutrition_blob'>
        <div className="nutrition-total-div">
            <h2 className="nutrition-total">{total}</h2>
            <div className="nutrition-total-g">g</div>
        </div>
        <p className="nutrition-name">{name}</p>
    </div>
}

export default NutritionBlob