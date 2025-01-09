


const conversionGramJson = {
    'oz': {
        'ratio': 28.3495,
        'measurement': 'oz'
    },
    'lb': {
        'ratio': 453.592,
        'measurement': 'lb'
    },
};

function roundToNearestHalf(value: number): number {
    return Math.round(value * 2) / 2;
}

function convertToImperialFromGrams(quantityInGrams: number): {
    quantity: string;
    measurement: string;

} {
    // Convert grams to pounds and ounces
    const gramsToPounds = quantityInGrams / conversionGramJson['lb'].ratio;
    const gramsToOunces = quantityInGrams / conversionGramJson['oz'].ratio;

    if (gramsToPounds >= 0.5) {
        // Round to nearest half pound if quantity is at least 0.5 pounds
        const roundedPounds = roundToNearestHalf(gramsToPounds);
        return { quantity: `${roundedPounds}`, measurement: 'lb' };
    } else {
        // Otherwise, convert to ounces and round to the nearest half ounce
        const roundedOunces = roundToNearestHalf(gramsToOunces);
        return { quantity: `${roundedOunces}`, measurement: 'oz' };
    }
}


const conversionVolumeJson = {
    'ml': {
        'ratio': 1,
        'measurement': 'ml'
    },
    'teaspoon': {
        'ratio': 4.929,
        'measurement': 'tsp'
    },
    'tablespoon': {
        'ratio': 14.787,
        'measurement': 'tbsp'
    },
    'cup': {
        'ratio': 236.588,
        'measurement': 'cup'
    },
    'gallon': {
        'ratio': 3785.41,
        'measurement': 'gallon'
    }
};

// Helper functions for rounding
function roundToWhole(value: number): number {
    return Math.round(value);
}

function roundToThirdOrFourthOrHalf(value: number): number {
    const quarter = Math.round(value * 4) / 4;
    const third = Math.round(value * 3) / 3;
    const half = Math.round(value * 2) / 2;

    if (Math.abs(quarter - value) < Math.abs(third - value)) {
        return quarter;
    }
    return Math.abs(third - value) < Math.abs(half - value) ? third : half;
}

function roundUpToHalf(value: number): number {
    return Math.ceil(value * 2) / 2;
}

function convertToImperialFromMilliliters(quantityInMilliliters: number): {
    quantity: string;
    measurement: string;
} {
    const mlToTeaspoon = quantityInMilliliters / conversionVolumeJson['teaspoon'].ratio;
    const mlToTablespoon = quantityInMilliliters / conversionVolumeJson['tablespoon'].ratio;
    const mlToCup = quantityInMilliliters / conversionVolumeJson['cup'].ratio;
    const mlToGallon = quantityInMilliliters / conversionVolumeJson['gallon'].ratio;

    if (mlToTeaspoon < 3) {
        // If less than 3 teaspoons, round to the nearest whole teaspoon
        const roundedTeaspoon = roundToWhole(mlToTeaspoon);
        return { quantity: `${roundedTeaspoon}`, measurement: 'tsp' }
    } else if (mlToTablespoon < 16) {
        // If less than 16 tablespoons, round to the nearest whole tablespoon
        const roundedTablespoon = roundToWhole(mlToTablespoon);
        return { quantity: `${roundedTablespoon}`, measurement: 'tbsp' }
    } else if (mlToCup < 16) {
        // If less than 16 cups, round to the nearest fourth, third, or half cup
        const roundedCup = roundToThirdOrFourthOrHalf(mlToCup);
        return { quantity: `${roundedCup}`, measurement: 'cup' }
    } else {
        // Otherwise, round up to the nearest half gallon
        const roundedGallon = roundUpToHalf(mlToGallon);
        return { quantity: `${roundedGallon}`, measurement: 'gallon' }
    }
}


const conversionJsonMetric = {
    'gram': {
        'ratio': 1,
        'measurement': 'g'
    },
    'kg': {
        'ratio': 1000,
        'measurement': 'kg'
    },
    'milliliter': {
        'ratio': 1,
        'measurement': 'ml'
    },
    'liter': {
        'ratio': 1000,
        'measurement': 'l'
    }
};


// Function to convert a given quantity to grams or kilograms
function convertToMetricWeight(quantityInGrams: number): {
    quantity: string;
    measurement: string;
} {
    const gramsToKilograms = quantityInGrams / conversionJsonMetric['kg'].ratio;

    if (gramsToKilograms >= 1) {
        const roundedKilograms = roundToNearestHalf(gramsToKilograms);
        return { quantity: `${roundedKilograms}`, measurement: 'kg' }
    } else {
        const roundedGrams = roundToNearestHalf(quantityInGrams);
        return { quantity: `${roundedGrams}`, measurement: 'g' }
    }
}

// Function to convert a given quantity to milliliters or liters
function convertToMetricVolume(quantityInMilliliters: number): {
    quantity: string;
    measurement: string;
} {
    const mlToLiters = quantityInMilliliters / conversionJsonMetric['liter'].ratio;

    if (mlToLiters >= 1) {
        const roundedLiters = roundToNearestHalf(mlToLiters);
        return { quantity: `${roundedLiters}`, measurement: 'l' }

    } else {
        const roundedMilliliters = roundToNearestHalf(quantityInMilliliters);
        return { quantity: `${roundedMilliliters}`, measurement: 'ml' }

    }
}




export function convertQuantity(quantity: number, measurement: string, system: 'imperial' | 'metric'): {
    quantity: string;
    measurement: string;
} {
    if (measurement != 'g' && measurement != 'ml')
        return { quantity: `${quantity}`, measurement }
    if (system === 'imperial') {
        if (measurement == 'g') {
            return convertToImperialFromGrams(quantity);
        }

        return convertToImperialFromMilliliters(quantity);
    } else {
        if (measurement == 'g') {
            return convertToMetricWeight(quantity);
        }
        return convertToMetricVolume(quantity);
    }
}

