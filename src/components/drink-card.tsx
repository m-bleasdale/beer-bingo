'use client'

import type { Drink } from "@/types/drink";
import Image from "next/image";
import { Button } from "./ui/button";
import countDrink from "@/utils/countDrink";
import { useEffect, useState } from "react";
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

    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(10);

    let background = '#ffffff';

    if(count) {
        if(count >= 1) background = '#ebc095';
        if(count >= 5) background = '#dfe1e8';
        if(count >= 10) background = '#f0e4b0';
        if(count >= 20) background = '#c1e5edff';
    }

    useEffect(() => {
        if (!isDisabled) return; // No countdown if button is enabled

        const timer = setInterval(() => {
        setCountdown((prev) => {
            if (prev <= 1) {
            clearInterval(timer); // Stop countdown when it hits 0
            setIsDisabled(false);
            return 0;
            }
            return prev - 1;
        });
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on unmount
    }, [isDisabled]);


    function handleCount () {
        countDrink(drink.id);
        setCount(count + 1);
        setCountedThisSession(true);

        setIsDisabled(true);
        setCountdown(10);

    }

    function handleUndo () {
        undoDrink(drink.id);
        setCount(count - 1);
    }

    //onError={(e) => e.currentTarget.src = `/public/drinks/${drink.type}.png`} 

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
                    <Button onClick={handleCount} disabled={isDisabled} className="w-25">
                        {isDisabled ? `Wait ${countdown}s` : 'Add Drink'}
                    </Button>
                    {((displayUndo && isLoggedIn) || (countedThisSession && count >= 1)) &&
                        <Button variant="link" className="pr-0 text-muted-foreground" onClick={handleUndo}>Undo</Button>
                    }
                </div>
                {count >= 1 && <p className="text-xs text-muted-foreground">{count}</p>}
            </div>
        </div>
    )

}