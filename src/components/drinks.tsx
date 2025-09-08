import { createClient } from "@/utils/supabase/server";
import { DrinkCardData } from "@/types/drink-card-data";
import isLoggedIn from "@/utils/isLoggedIn";
import DrinkListProvider from "./drink-list-provider";
import Error from "./error";
import { Drink } from "@/types/drink";

function isInLastHour(mostRecentDrink : string | undefined) {
    if(!mostRecentDrink) return false;
    const date = new Date(mostRecentDrink.replace(/\.(\d{3})\d+/, '.$1'));
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    return date >= oneHourAgo;
}

export default async function Drinks () {
    const supabase = await createClient();
    
    //Create promises to get drinks and images, and resolve at same time
    const drinksPromise = supabase
        .from('drinks')
        .select('id, name, type, abv, user_added')
        .order('name', {ascending: true});

    const imagesPromise = supabase.storage
        .from('drinks')
        .list('');

    const [{ data: drinksListFromDB, error: drinksListFromDB_error }, { data: drinkImages, error: drinkImages_error }] =
        await Promise.all([drinksPromise, imagesPromise]);
    
    if(drinksListFromDB_error || drinkImages_error) return <Error />;


    //Get IDs of drinks with an image
    const drinkIDsWithImage = drinkImages.map(image => image.name.replace(/\.png$/i, ''));

    //Check user is logged in, and get ID
    const { data: user_data, error: user_error } = await supabase.auth.getUser();
    const userID = user_data?.user?.id;

    //Fetch all historic records for user
    let historyRows: { drink_id: string; drunk_at: string }[] = [];
    if(userID) {
        const { data: history_data, error: history_error } = await supabase
            .from('history')
            .select('drink_id, drunk_at')
            .eq('user_id', user_data.user?.id)
            .order('drunk_at', { ascending: false });
 
        historyRows = history_data || [];
    }

    //Create map of history records by drink_id
    const historyMap = new Map<string, { count: number; mostRecent?: string }>();
    for (const row of historyRows) {
        const cur = historyMap.get(row.drink_id);
        if (!cur) {
            historyMap.set(row.drink_id, { count: 1, mostRecent: row.drunk_at });
        } else {
            cur.count += 1;
            // mostRecent already set to newest because we ordered descending
        }
    }

    //Construct drinksList
    const drinksList = (drinksListFromDB ?? []).map((drink: Drink) => {
        //If drink has an image, get url, otherwise: use a default
        const drinkHasImage = drinkIDsWithImage.includes(drink.id);
        const imageURL = drinkHasImage
            ? supabase.storage.from('drinks').getPublicUrl(`${drink.id}.png`,{ transform: { height: 500, width: 500, resize: "contain"} }).data.publicUrl
            : `/defaults/${drink.type}.png`;
        
        const history = historyMap.get(drink.id);
        const initialCount = history?.count ?? 0;
        const mostRecent = history?.mostRecent;
        const displayUndo = isInLastHour(mostRecent);

        return {
            drink,
            imageURL,
            initialCount,
            displayUndo,
        };

    });

    const loggedIn = Boolean(userID);
    
    return (
        <DrinkListProvider drinksList={drinksList} isLoggedIn={loggedIn} />
    )
}   
