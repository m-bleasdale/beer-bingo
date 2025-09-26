import Error from "@/components/error";
import { createClient } from "@/utils/supabase/server";
import * as drinksOverPeriod from "./drinksOverPeriod";
import * as periodChange from "./periodChange";
import StatCard from "@/components/stat-card";
import StatChart from "@/components/stat-chart";
import topDrinks from "./topDrinks";
import Image from "next/image";
import LastDrinks from "@/components/stat-last-drinks";

export default async function Stats () {
    const supabase = await createClient();

    const { data: user_data, error: user_error } = await supabase.auth.getUser();
    if(user_error || !user_data?.user) return <Error />

    const { data: history, error} = await supabase
        .from('history')
        .select('drunk_at, drink_id')
        .eq('user_id', user_data.user.id);
    
    if(error) return <Error />
    if(!history || history.length === 0) return (
        <div className="h-svh w-full flex flex-row mt-40 justify-center gap-3">
            <p className='text-muted-foreground text-center'>Nothing to display. Start recording drinks to see stats.</p>
        </div>
    )

    const allTime = history.length;
    const last24 = drinksOverPeriod.drinksInLast24h(history);
    const thisWeek = drinksOverPeriod.drinksThisWeek(history);
    const thisMonth = drinksOverPeriod.drinksThisMonth(history);

    const last24Change = periodChange.drinksChangeLast24h(history);
    const thisMonthChange = periodChange.drinksChangeThisMonth(history);
    const thisWeekChange = periodChange.drinksChangeThisWeek(history);

    const top3Drinks = await topDrinks(history, 3);
    
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="grid grid-cols-2 gap-5 lg:gap-10 lg:px-6 @xl/main:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <StatCard
                    description="24 hours"
                    title={last24.toString()}
                    trendStat={last24Change.change.toString()}
                    trend={last24Change.trend}
                />
                <StatCard
                    description="This week"
                    title={thisWeek.toString()}
                    trendStat={thisWeekChange.change.toString()}
                    trend={thisWeekChange.trend}
                />
                <StatCard
                    description="This month"
                    title={thisMonth.toString()}
                    trendStat={thisMonthChange.change.toString()}
                    trend={thisMonthChange.trend}
                />
                <StatCard
                    description="All time"
                    title={allTime.toString()}
                />
            </div>
            <StatChart history={history} />
            <div className="flex flex-col items-center gap-5 w-full mt-10">
                <h2 className="text-2xl font-medium">Top Drinks</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-15 gap-8 items-center">
                    {top3Drinks.map((data, index) => {
                        if(!data || !data.drink) return;

                        let background;
                        switch (index) {
                            case 0: 
                                background = '#f0e4b0';
                                break;
                            case 1: 
                                background = '#dfe1e8';
                                break;
                            case 2: 
                                background = '#ebc095';
                                break;
                        }

                        return (
                            <div key={data.drink.id} className="p-5 border rounded-xl w-68 flex flex-col" style={{background: background}}>
                                <div className="flex justify-center items-center">
                                    <Image src={data.imageURL} alt={`Image of ${data.drink.name}`} height={200} width={200} objectFit="contain" />
                                </div>
                                <h3 className="text-lg font-medium mt-2">{data.drink.name}</h3>
                                <div className="flex flex-row text-sm text-muted-foreground justify-between items-center">
                                    <p>{data.drink.type}</p>
                                    {data.drink.abv && <p>{data.drink.abv?.toString()}% ABV</p>}
                                </div>
                                <div className="flex flex-row justify-between items-center mt-2">
                                    <p className="text-sm text-muted-foreground">Total: {data.count}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-5 w-full items-center mt-10 pb-5">
                <h2 className="text-2xl font-medium">Last 12 Hours</h2>
                <LastDrinks history={history} />
            </div>
        </div>
    )

}