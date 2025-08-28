'use client';

import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

export default function LoginPrompt () {
    const router = useRouter()

    return (
        <Dialog defaultOpen>
        <DialogContent className="w-full md:w-100">
            <DialogHeader>
                <DialogTitle>Enter email to save history</DialogTitle>
                <DialogDescription>
                    If you've already made an account, enter the email from that account. Otherwise you'll be making a new account.
                </DialogDescription>
            </DialogHeader>

            <Button onClick={() => router.push('/account')}>Login or create account</Button>

            <DialogClose asChild>
                <Button variant="outline">Continue as Guest</Button>
            </DialogClose>

        </DialogContent>
        </Dialog>

    )
}