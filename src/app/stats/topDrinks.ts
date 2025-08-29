import { Drink } from "@/types/drink";
import { StatDataPoint } from "@/types/stat-data-point";
import { createClient } from "@/utils/supabase/server";

export default async function topDrinks(history: StatDataPoint[], topN = 3, userID: string) {
	const supabase = await createClient();

	// Count drinks by drink_id
	const counts: Record<string, number> = {};
	history.forEach(entry => {
		counts[entry.drink_id] = (counts[entry.drink_id] || 0) + 1;
	});

	// Convert to array and sort by count descending
	const sorted = Object.entries(counts)
		.map(([drink_id, count]) => ({ drink_id, count }))
		.sort((a, b) => b.count - a.count);

	// Return top N
	const topDrinkList = sorted.slice(0, topN);

	let topDrinks = [];

	//Retrieve data
    for (const drink of topDrinkList) {
        const { data: image } = supabase.storage
            .from('drinks')
            .getPublicUrl(`${drink.drink_id}.png`, 
                {
                transform: { height: 500, width: 500, resize: "contain"},
            	}
            );
            
		const { data: drinkData } = await supabase
			.from('drinks')
			.select('id, name, type, abv')
			.eq('id', drink.drink_id)
			.limit(1)
			.single();
    
		topDrinks.push({
			drink: drinkData,
			count: drink.count,
			imageURL: image.publicUrl
		})
    }

	return topDrinks;

}