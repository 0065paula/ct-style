"use client"

import { Field, FieldLabel, FieldDescription, FieldErrorMessage } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function FieldDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Payment Method</h3>
        <p className="text-sm text-muted-foreground">
          All transactions are secure and encrypted
        </p>
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6 space-y-6">
            <Field>
              <FieldLabel htmlFor="name">Name on Card</FieldLabel>
              <Input id="name" placeholder="Evil Rabbit" />
            </Field>

            <Field>
              <FieldLabel htmlFor="card">Card Number</FieldLabel>
              <Input id="card" placeholder="1234 5678 9012 3456" />
              <FieldDescription>
                Enter your 16-digit card number
              </FieldDescription>
            </Field>

            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="month">Month</FieldLabel>
                <Select>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="year">Year</FieldLabel>
                <Select>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                <Input id="cvv" placeholder="123" />
              </Field>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-1">Billing Address</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  The billing address associated with your payment method
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox id="same-address" defaultChecked />
                  <Label htmlFor="same-address" className="text-sm font-normal cursor-pointer">
                    Same as shipping address
                  </Label>
                </div>
              </div>
            </div>

            <Field>
              <FieldLabel htmlFor="comments">Comments</FieldLabel>
              <textarea
                id="comments"
                placeholder="Add any additional comments"
                className="flex min-h-[80px] w-full rounded-[5px] border border-[rgba(172,186,211,0.6)] bg-white px-3 py-[5px] text-[13px] leading-[1.5384615384615385em] text-[#0A0E27] placeholder:text-[rgba(0,21,64,0.3)] transition-colors hover:shadow-[0px_0px_0px_4px_rgba(225,230,241,0.6)] focus-visible:outline-none focus-visible:border-[#0080FF] focus-visible:shadow-[0px_0px_0px_4px_rgba(0,136,255,0.16)] disabled:cursor-not-allowed disabled:bg-[rgba(211,218,235,0.6)] disabled:border-[rgba(172,186,211,0.6)] disabled:text-[rgba(44,56,82,0.6)]"
              />
            </Field>

            <div className="flex gap-3">
              <Button variant="default">Submit</Button>
              <Button variant="basic">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">With Error State</h3>
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6 space-y-6">
            <Field>
              <FieldLabel htmlFor="email-error">Email</FieldLabel>
              <Input id="email-error" type="email" variant="error" />
              <FieldErrorMessage>
                Please enter a valid email address
              </FieldErrorMessage>
            </Field>

            <Field>
              <FieldLabel htmlFor="password-error">Password</FieldLabel>
              <Input id="password-error" type="password" variant="error" />
              <FieldDescription>
                Password must be at least 8 characters
              </FieldDescription>
              <FieldErrorMessage>
                Password is too short
              </FieldErrorMessage>
            </Field>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

