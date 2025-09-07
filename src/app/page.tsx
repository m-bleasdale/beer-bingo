import Image from "next/image";
import Drinks from "../components/drinks";
import isLoggedIn from "@/utils/isLoggedIn";
import LoginPrompt from "@/components/login-prompt";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";

export default async function Home() {

	const loggedIn = await isLoggedIn();

  	return (
		<div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-5">
			<div className="flex flex-col gap-2 items-center">
				<h1 className="text-4xl font-medium">Beer Bingo</h1>
				<p>Built by <a href="https://mbleasdale.com" target="_blank" className="underline text-blue-800">Morgan Bleasdale</a></p>
			</div>
			<div className="flex flex-row gap-2 items-center">
				{loggedIn &&
					<a href="/stats">
						<Button variant="default">See Your Stats</Button>
					</a>
				}
				{loggedIn ? 
					(
						<a href="/account/signout">
							<Button variant="outline">Sign out</Button>
						</a>
					)
					: 
					(
						<a href="/account">
							<Button variant="outline">Sign In</Button>
						</a>
					)
				}
				<a href="/feedback">
					<Button variant="outline">Feedback</Button>
				</a>
			</div>
			{!loggedIn && <LoginPrompt />}
			<Suspense fallback={<Loading />}>
				<Drinks />
			</Suspense>
			<p className="mt-10 text-lg text-muted-foreground text-center">Alcohol can affect your health. Want support to cut back? <a className="underline text-foreground font-semibold" href="https://www.drinkaware.co.uk/advice-and-support/alcohol-support-services/get-help-now/">Get help</a></p>
		</div>
  );
}
