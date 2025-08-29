import { StatDataPoint } from "@/types/stat-data-point";

export function drinksInLast24h (history : StatDataPoint[] ) {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return history.filter(entry => new Date(entry.drunk_at) >= cutoff).length;
}

export function drinksThisWeek(history: StatDataPoint[]): number {
    const now = new Date();
    const day = now.getDay(); 
    const diffToMonday = day === 0 ? 6 : day - 1; 
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    return history.filter(entry => {
		const time = new Date(entry.drunk_at);
		return time >= monday && time <= now;
    }).length;
}

export function drinksThisMonth(history: StatDataPoint[]) {
    const now = new Date();
    const cutoff = new Date(now.getFullYear(), now.getMonth(), 1); // 1st of this month

    return history.filter(entry => new Date(entry.drunk_at) >= cutoff).length;
}