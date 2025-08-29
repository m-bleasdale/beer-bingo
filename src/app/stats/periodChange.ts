import { StatDataPoint } from "@/types/stat-data-point";

interface TrendResult {
  change: number;
  trend: 'up' | 'down' | 'none';
}

function calculateTrendForPeriod(
    history: StatDataPoint[],
    currentStart: Date,
    currentEnd: Date,
    prevStart: Date,
    prevEnd: Date
): TrendResult {
    const currentCount = history.filter(entry => {
        const time = new Date(entry.drunk_at);
        return time >= currentStart && time <= currentEnd;
    }).length;

    const previousCount = history.filter(entry => {
        const time = new Date(entry.drunk_at);
        return time >= prevStart && time <= prevEnd;
    }).length;

    let change: number;
    let trend: 'up' | 'down' | 'none' = 'none';

    //Extremes first then normal calc
    if (previousCount === 0 && currentCount > 0) {
        // Extreme increase from 0
        change = currentCount * 100; // e.g., 7 drinks → 700%
        trend = 'up';
    } else if (currentCount === 0 && previousCount > 0) {
        // Extreme decrease to 0
        change = -previousCount * 100; // e.g., 7 → -700%
        trend = 'down';
    } else if (currentCount === 0 && previousCount === 0) {
        change = 0;
        trend = 'none';
    } else {
        // Normal percentage calculation
        change = ((currentCount - previousCount) / previousCount) * 100;
        if (change > 0) trend = 'up';
        else if (change < 0) trend = 'down';
    }

    return {
        change: Number(change.toFixed(1)),
        trend
    };
}

// 24h trend
export function drinksChangeLast24h(history: StatDataPoint[]): TrendResult {
    const now = new Date();
    const currentStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const prevStart = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const prevEnd = new Date(currentStart.getTime() - 1);

    return calculateTrendForPeriod(history, currentStart, now, prevStart, prevEnd);
}

//Last week
export function drinksChangeThisWeek(history: StatDataPoint[]): TrendResult {
  const now = new Date();
  const dayOfWeek = now.getDay();
  
  const currentStart = new Date(now);
  currentStart.setHours(0, 0, 0, 0);
  currentStart.setDate(currentStart.getDate() - dayOfWeek);

  const prevStart = new Date(currentStart);
  prevStart.setDate(prevStart.getDate() - 7);

  const prevEnd = new Date(currentStart);
  prevEnd.setMilliseconds(-1);

  return calculateTrendForPeriod(history, currentStart, now, prevStart, prevEnd);
}


// Monthly trend
export function drinksChangeThisMonth(history: StatDataPoint[]): TrendResult {
    const now = new Date();
    const currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    return calculateTrendForPeriod(history, currentStart, now, prevStart, prevEnd);
}
