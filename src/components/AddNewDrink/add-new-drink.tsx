'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useActionState, useEffect, useState } from 'react'
import { addDrink } from './actions'

const initialState = { error: null, success: false}

export default function AddNewDrink () {
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(addDrink, initialState);

    useEffect(() => {
        if(state.success) {
            setType('');
            setOpen(false);
        }
    }, [state.success])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="h-9 px-4 py-2 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center hover:cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
                Add a new drink
            </DialogTrigger>
            <DialogContent className="w-full md:w-100">
                <DialogHeader>
                    <DialogTitle>Add New Drink</DialogTitle>
                    <DialogDescription>
                        If you've already made an account, enter the email from that account. Otherwise you'll be making a new account.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="flex flex-col gap-6">
                        {state.error && (
                            <p className="text-md text-red-500 font-normal text-center">{state.error}</p>
                        )}
                        <div className="grid gap-3">
                            <Label htmlFor="drink">Drink Name</Label>
                            <Input
                            id="drink"
                            name="drink"
                            type="text"
                            placeholder="eg: Madri Excepcional"
                            required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="type">Drink Type</Label>

                            <input type="hidden" name="type" value={type} />

                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Drink Type" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    <SelectItem value="Lager">Lager</SelectItem>
                                    <SelectItem value="Cider">Cider</SelectItem>
                                    <SelectItem value="IPA">IPA</SelectItem>
                                    <SelectItem value="Ale">Ale</SelectItem>
                                    <SelectItem value="Stout">Stout</SelectItem>
                                    <SelectItem value="Mixer">Mixer</SelectItem>
                                    <SelectItem value="Shot">Shot</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full" disabled={isPending}>Add Drink</Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>

    )

}