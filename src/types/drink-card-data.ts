import type { Drink } from "./drink";

export interface DrinkCardData {
    drink: Drink;
    imageURL: string;
    initialCount: number;
    displayUndo?: Boolean;
    isLoggedIn?: Boolean;
}