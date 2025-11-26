"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="basic">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="basic">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export function SheetSidesDemo() {
  const [side, setSide] = React.useState<"top" | "right" | "bottom" | "left">("right")

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={side === "top" ? "default" : "basic"}
          onClick={() => setSide("top")}
        >
          Top
        </Button>
        <Button
          variant={side === "right" ? "default" : "basic"}
          onClick={() => setSide("right")}
        >
          Right
        </Button>
        <Button
          variant={side === "bottom" ? "default" : "basic"}
          onClick={() => setSide("bottom")}
        >
          Bottom
        </Button>
        <Button
          variant={side === "left" ? "default" : "basic"}
          onClick={() => setSide("left")}
        >
          Left
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="basic">Open {side} Sheet</Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Side Sheet</SheetTitle>
            <SheetDescription>
              This sheet opens from the {side} side.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              You can change the side using the buttons above.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

