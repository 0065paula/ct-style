"use client"

import * as React from "react"
import { DatePicker } from "@/components/ui/date-picker"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      placeholder="Pick a date"
    />
  )
}

