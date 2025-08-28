'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useActionState, useState } from 'react'

import { auth } from './actions';

const initialState = { error: null, success: false}

export default function Page () {
    const [state, formAction, isPending] = useActionState(auth, initialState)

    return (
        <div className="flex justify-center">
            <div className="w-90 mt-20 lg:mt-45">
                <Card>
                    <CardHeader>
                        <CardTitle>Enter an email and password</CardTitle>
                        <CardDescription>
                            <p>If you've already made an account, enter the email from that account. </p>
                            <p>Otherwise you'll be making a new account.</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction}>
                            <div className="flex flex-col gap-6">
                                {state.error && (
                                    <p className="text-md text-red-500 font-normal text-center">{state.error}</p>
                                )}
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" name="password" required />
                                </div>
                                <Button type="submit" className="w-full" disabled={isPending}>
                                Go
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}