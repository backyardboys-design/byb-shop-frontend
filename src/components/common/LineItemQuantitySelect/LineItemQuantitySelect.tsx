"use client"

import { updateLineItem } from "@/lib/data/cart"
import { ActionIcon, Box, Group, Text } from "@mantine/core"
import { HttpTypes } from "@medusajs/types"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const LineItemQuantitySelect = ({ item }: ItemProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [quantity, setQuantity] = useState(item.quantity)
  const [error, setError] = useState<string | null>(null)

  const maxQtyFromInventory = 5
  const maxQuantity = item.variant?.manage_inventory ? maxQtyFromInventory : 999

  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity, item.id])

  const changeQuantity = (delta: number) => {
    if (isPending) return

    const newQuantity = quantity + delta
    if (newQuantity < 1 || newQuantity > maxQuantity) return

    const previousQuantity = quantity
    setQuantity(newQuantity)
    setError(null)

    startTransition(async () => {
      try {
        await updateLineItem({
          lineId: item.id,
          quantity: newQuantity,
        })

        router.refresh()
      } catch (err: any) {
        setQuantity(previousQuantity)
        setError(err?.message || "Fehler beim Aktualisieren")
      }
    })
  }

  return (
    <>
      <Group gap={0} mt={10} wrap="nowrap">
        <ActionIcon
          variant="light"
          color="gray"
          radius={0}
          size={32}
          onClick={() => changeQuantity(-1)}
          disabled={quantity <= 1 || isPending}
          aria-label="Menge verringern"
          style={{
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            borderRight: "none",
          }}
        >
          <IconMinus size={16} stroke={1.8} />
        </ActionIcon>

        <Box
          style={{
            width: 42,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--mantine-color-body)",
            fontSize: 15,
          }}
        >
          {quantity}
        </Box>

        <ActionIcon
          variant="light"
          color="gray"
          radius={0}
          size={32}
          onClick={() => changeQuantity(1)}
          disabled={quantity >= maxQuantity || isPending}
          aria-label="Menge erhöhen"
          style={{
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            borderLeft: "none",
          }}
        >
          <IconPlus size={16} stroke={1.8} />
        </ActionIcon>
      </Group>

      {error && (
        <Text c="red" size="sm" mt={6}>
          {error}
        </Text>
      )}
    </>
  )
}

export default LineItemQuantitySelect