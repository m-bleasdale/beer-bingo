import { StatDataPoint } from "@/types/stat-data-point";
import { createClient } from "@/utils/supabase/server";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function getLast12Hours(history : StatDataPoint[] | undefined) {
    if(!history) return [];
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
    
    return history.filter(entry => {
        const drunkAt = new Date(entry.drunk_at);
        return drunkAt >= twelveHoursAgo;
    });

}

export default async function LastDrinks({ history } : { history : StatDataPoint[] }) {
    const supabase = await createClient();

    //Filter history logs within last 12 hours
    const last12Hours = getLast12Hours(history);
    if(last12Hours.length === 0) return <p className="text-muted-foreground">Nothing to show</p>;

    //Get a list of drinks that have been consumed in last 12 hours
    const uniqueDrinkIDs = [...new Set(last12Hours.map(item => item.drink_id))];
    
    //Fetch data for drinks consumed
    const { data: drinks, error } = await supabase
        .from("drinks")
        .select("id, name, type, abv")
        .in("id", uniqueDrinkIDs);

    if(error) return <p className="text-muted-foreground">Nothing to show</p>;

    //Construct single array for each consumption with time and drink details
    const drinkMap = new Map(drinks.map(drink => [drink.id, drink]));
    const drinkDataPoint = last12Hours.map(item => {
        const date = new Date(item.drunk_at);
        const timeDrunk = date.toLocaleTimeString("en-GB", 
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );

        return {
            drunk_at: timeDrunk,
            drink: drinkMap.get(item.drink_id) ?? null
        }
    });

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-muted">
                    <TableHead>Time</TableHead>
                    <TableHead>Drink</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">ABV</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {drinkDataPoint.map((row, index) => {
                if(!row.drink) return;
                return (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{row.drunk_at}</TableCell>
                        <TableCell className="whitespace-normal break-words">{row.drink.name}</TableCell>
                        <TableCell>{row.drink.type}</TableCell>
                        <TableCell className="text-right">{row.drink.abv != null ? `${row.drink.abv}%` : ""}</TableCell>
                    </TableRow>
                )
            })}
            </TableBody>
        </Table>
    )


}