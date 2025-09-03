import { Button } from "@/components/ui/button";

export default function Page () {
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
                <a href="/stats">
                    <Button variant="outline">Stats</Button>
                </a>
			</div>

            <h2 className="text-3xl font-medium">Feedback</h2>

            <div className="flex flex-col w-full lg:w-200 gap-10 items-center">
                <p className="text-md text-center">This project is designed to make tracking how much alcohol you're consuming fun. By tracking alcohol intake, people become more aware of how much they are drinking, and if they need to consider cutting down.</p>
                <p className="text-md text-center">If you have feedback on how to improve this app, please use the form linked below.</p>
                <a href="https://forms.gle/jbs9k1SFkK113Gwu5">
                    <Button>Submit Feedback</Button>
                </a>

                <div className="flex flex-col w-full lg:w-200 gap-4">
                    <h2 className="text-lg font-semibold">v1.0.2 Changelog, 3rd September 2025</h2>
                    <p className="text-md">Based on the last round of community feedback, the following has been updated:</p>
                    <p className="text-md">- Fixed two negative signs appearing</p>
                    <p className="text-md">- Optimisation improvements</p>
                    <p className="text-md">- Navigation UI adjustments </p>
                </div>

                <div className="flex flex-col w-full lg:w-200 gap-4">
                    <h2 className="text-lg font-semibold">v1.0.1 Changelog, 29th August 2025</h2>
                    <p className="text-md">Based on the last round of community feedback, the following has been updated:</p>
                    <p className="text-md">- Added support for non-beer drinks, such as mixers and shots</p>
                    <p className="text-md">- Added a 10 second timeout to avoid users spamming drinks</p>
                    <p className="text-md">- Added several new drinks based on suggestions</p>
                    <p className="text-md">- Improved stats interface by adding "Top Drinks" showing the users most consumed drinks</p>
                </div>
            </div>
        </div>

    )
}