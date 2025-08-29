import Loading from "@/components/loading";
import isLoggedIn from "@/utils/isLoggedIn";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Stats from "./stats";
import { Button } from "@/components/ui/button";


export default async function Page () {
    
    if(await isLoggedIn() === false) redirect('/');

    return (
        <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-5 sm:px-10">
			<div className="flex flex-col gap-2 items-center">
				<h1 className="text-4xl font-medium">Beer Bingo</h1>
				<p>Built by <a href="https://mbleasdale.com" target="_blank" className="underline text-blue-800">Morgan Bleasdale</a></p>
			</div>
            <div className="flex flex-row gap-2 items-center">
                <a href="/">
                    <Button variant="outline">Back to home</Button>
                </a>
                <a href="/feedback">
                    <Button variant="outline">Feedback</Button>
                </a>
			</div>

            <h2 className="text-3xl font-medium mb-5">Your Statistics</h2>
			<Suspense fallback={<Loading />}>
                <Stats />
			</Suspense>
            <p className="mt-10 text-lg text-muted-foreground">Don't like what you see? <a className="underline text-foreground font-semibold" href="https://www.drinkaware.co.uk/advice-and-support/alcohol-support-services/get-help-now/">Get help</a></p>
		</div>

    )
}