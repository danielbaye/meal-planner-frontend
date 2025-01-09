
export function calculateIngridientCost(ing: { quantity: number; measurement: string; cost_per_100_gr_ml: number }) {

    return ing.quantity * ing.cost_per_100_gr_ml * (ing.measurement == 'ml' || ing.measurement == 'g' ? 0.01 : 1)

}