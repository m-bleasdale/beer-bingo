"use client";
import type { DrinkCardData } from "@/types/drink-card-data"
import DrinkCard from "./drink-card"
import { useState } from "react";
import { Input } from "./ui/input";

export default function DrinkListProvider ({drinksList, isLoggedIn} : {drinksList : DrinkCardData[], isLoggedIn : Boolean}) {
    const [search, setSearch] = useState("");

    const filteredDrinks = drinksList.filter(({drink}) =>
        drink.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex flex-col items-center lg:gap-10 gap-8 ">
            <Input
                className="h-11 lg:w-100 w-full"
                type="text"
                placeholder="Search drinks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredDrinks.length !== 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-15 gap-8 items-center">
                    {filteredDrinks.map(({drink, imageURL, initialCount, displayUndo}) => (
                        <DrinkCard
                            key={drink.id.toString()} 
                            drink={drink}
                            imageURL={imageURL}
                            initialCount={initialCount}
                            displayUndo={displayUndo}
                            isLoggedIn={isLoggedIn}
                        />
                    ))}
                </div>
            )
            :
            (
                <p>No results found</p>
            )
            }
        </div>
    )
    
}