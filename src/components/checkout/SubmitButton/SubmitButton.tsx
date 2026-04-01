"use client"

import { Button } from "@mantine/core"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,

  variant = "gradient",
  "data-testid": dataTestId,
  size,
}: {
  children: React.ReactNode
  variant?:
    | "filled"
    | "light"
    | "outline"
    | "subtle"
    | "transparent"
    | "white"
    | null
  "data-testid"?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | null
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      size={size || "sm"}
      type="submit"
      loading={pending}
      variant={variant || "gradient"}
      data-testid={dataTestId}
            radius="md"
      gradient={{ from: "grape", to: "indigo", deg: 145 }}
    >
      {children}
    </Button>
  )
}
