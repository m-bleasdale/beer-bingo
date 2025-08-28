import Image from "next/image";
import Drinks from "../components/drinks";
import isLoggedIn from "@/utils/isLoggedIn";
import LoginPrompt from "@/components/login-prompt";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default async function Home() {

	const loggedIn = await isLoggedIn();

  	return (
		<div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-5 sm:px-10">
			<div className="flex flex-col gap-2 items-center">
				<h1 className="text-4xl font-medium">Beer Bingo</h1>
				<p>Built by <a href="https://mbleasdale.com" target="_blank" className="underline text-blue-800">Morgan Bleasdale</a></p>
			</div>
			{!loggedIn && <LoginPrompt />}
			<Suspense fallback={<Loading />}>
				<Drinks />
			</Suspense>
		</div>
  );
}
