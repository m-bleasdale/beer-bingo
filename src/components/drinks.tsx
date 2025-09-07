import { createClient } from "@/utils/supabase/server";
import { DrinkCardData } from "@/types/drink-card-data";
import isLoggedIn from "@/utils/isLoggedIn";
import DrinkListProvider from "./drink-list-provider";
import Error from "./error";

function isInLastHour(mostRecentDrink : String) {
    if(!mostRecentDrink) return false;
    const date = new Date(mostRecentDrink.replace(/\.(\d{3})\d+/, '.$1'));
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    return date >= oneHourAgo;
}

export default async function Drinks () {
    const supabase = await createClient();

    //Getting all drink data
    const {data: drinksListFromDB, error} = await supabase
        .from('drinks')
        .select('id, name, type, abv')
        .order('name', {ascending: true})
    
    if(error) return <Error />

    //Getting all images in drinks bucket
    const {data: drinkImages, error: drinkImages_error} = await supabase.storage
        .from('drinks')
        .list('');
    
    if(drinkImages_error) return <Error />

    //Get IDs of drinks with an image
    const drinkIDsWithImage = drinkImages.map(image => image.name.replace(/\.png$/i, ''));

    //Check user is logged in, and get ID
    const { data: user_data, error: user_error } = await supabase.auth.getUser();
    const loggedIn = await isLoggedIn();

    //Init drinksList
    let drinksList : DrinkCardData[] = [];

    //Loop through drinks constructing data for card
    for (const drink of drinksListFromDB) {
        
        //If drink has an image, get url, otherwise: use a default
        const drinkHasImage = drinkIDsWithImage.includes(drink.id);
        const imageURL = drinkHasImage
            ? supabase.storage
                .from('drinks')
                .getPublicUrl(`${drink.id}.png`, 
                    {
                    transform: { height: 500, width: 500, resize: "contain"},
                    }
                )
                .data.publicUrl
            : `/defaults/${drink.type}.png`;

        //Retrieve drink history in decending order (newest first)
        const { data: history_data, error: history_error } = await supabase
            .from('history')
            .select('drunk_at')
            .eq('drink_id', drink.id)
            .eq('user_id', user_data.user?.id)
            .order('drunk_at', { ascending: false });
    
        const mostRecentDrink : String = history_data?.[0]?.drunk_at;

        //Will be false by default if never drunk
        const mostRecentWithinLastHour = isInLastHour(mostRecentDrink);

        drinksList.push({
            drink: drink,
            imageURL: imageURL,
            initialCount: history_data?.length || 0,
            displayUndo: mostRecentWithinLastHour
        })
    }

    return (
        <DrinkListProvider drinksList={drinksList} isLoggedIn={loggedIn} />
    )
}   
