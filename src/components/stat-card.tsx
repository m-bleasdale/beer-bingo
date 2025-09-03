import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface StatCardProps {
    description: string;
    title: string;
    trendStat?: string;
    trend?: 'up' | 'down' | 'none';
}

export default function StatCard ({description, title, trendStat, trend} : StatCardProps) {
    
    function Trend () {
        switch (trend) {
            case 'up':
                return (
                    <Badge className="bg-red-700">
                        <ChevronUp className="size-4" strokeWidth={3}/>
                        +{trendStat}%
                    </Badge>
                );
            case 'down':
                return (
                    <Badge className="bg-green-700">
                        <ChevronDown className="size-4" strokeWidth={3}/>
                        {trendStat}%
                    </Badge>
                );
            case 'none':
                return (
                    <Badge variant="outline">
                        <Minus className="size-4" strokeWidth={3}/>
                        No Change
                    </Badge>
                );
        }

    }

    return (
    <Card className="@container/card md:w-55 w-40 py-3 lg:py-5 shadow-none">
        <CardHeader>
            <CardDescription className="text-sm">
                {description}
            </CardDescription>
            <p className="text-2xl font-semibold">{title} <span className="text-sm text-muted-foreground font-normal">drinks</span></p>
            <div className="md:hidden"><Trend /></div>
            <CardAction>
                <div className="hidden md:block"><Trend /></div>
            </CardAction>
        </CardHeader>
      </Card>
    )
}