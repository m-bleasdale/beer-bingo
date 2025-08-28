'use client'

import type { Drink } from "@/types/drink";
import Image from "next/image";
import { Button } from "./ui/button";
import countDrink from "@/utils/countDrink";
import { useState } from "react";
import undoDrink from "@/utils/undoDrink";

interface DrinkCardProps {
    drink: Drink;
    imageURL: string;
    initialCount: number;
    displayUndo?: Boolean;
    isLoggedIn?: Boolean;
}

export default function DrinkCard ({drink, imageURL, initialCount, displayUndo, isLoggedIn} : DrinkCardProps) {
    const [count, setCount] = useState(initialCount);
    const [countedThisSession, setCountedThisSession] = useState(false);

    let background = '#ffffff';

    if(count) {
        if(count >= 1) background = '#ebc095';
        if(count >= 5) background = '#dfe1e8';
        if(count >= 10) background = '#f0e4b0';
        if(count >= 20) background = '#c1e5edff';
    }

    function handleCount () {
        countDrink(drink.id);
        setCount(count + 1);

        setCountedThisSession(true);
    }

    function handleUndo () {
        undoDrink(drink.id);
        setCount(count - 1);
    }

    return (
        <div className="p-5 border rounded-xl w-68 flex flex-col" style={{background: background}}>
            <div className="flex justify-center items-center">
                <Image src={imageURL} alt={`Image of ${drink.name}`} height={200} width={200} objectFit="contain" />
            </div>
            <h3 className="text-lg font-medium mt-2">{drink.name}</h3>
            <div className="flex flex-row text-sm text-muted-foreground justify-between items-center">
                <p>{drink.type}</p>
                {drink.abv && <p>{drink.abv?.toString()}% ABV</p>}
            </div>
            <div className="flex flex-row justify-between items-center mt-2">
                <div className="flex flex-row items-center">
                    <Button onClick={handleCount}>Add Drink</Button>
                    {((displayUndo && isLoggedIn) || (countedThisSession && count >= 1)) &&
                        <Button variant="link" className="pr-0 text-muted-foreground" onClick={handleUndo}>Undo</Button>
                    }
                </div>
                {count >= 1 && <p className="text-xs text-muted-foreground">{count}</p>}
            </div>
        </div>
    )

}