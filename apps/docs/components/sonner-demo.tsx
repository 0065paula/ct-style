"use client"

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

export function SonnerDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Basic</h3>
        <div className="space-y-4">
          <Button
            variant="basic"
            onClick={() => toast("Event has been created")}
          >
            Show Toast
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Different Types</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="basic"
            onClick={() => toast.success("Success! Your changes have been saved.")}
          >
            Success Toast
          </Button>
          <Button
            variant="basic"
            onClick={() => toast.error("Error! Something went wrong.")}
          >
            Error Toast
          </Button>
          <Button
            variant="basic"
            onClick={() => toast.info("Info: This is an informational message.")}
          >
            Info Toast
          </Button>
          <Button
            variant="basic"
            onClick={() => toast.warning("Warning: Please check your input.")}
          >
            Warning Toast
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-medium">With Action</h3>
        <Button
          variant="basic"
          onClick={() =>
            toast("Event has been created", {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast with Action
        </Button>
      </div>
      <Toaster />
    </div>
  )
}

