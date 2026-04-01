import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Table } from "@mantine/core"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderLine = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <>
    <Table.Tr>
      <Table.Td>BYB-{order.display_id}</Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>{order.payment_status}</Table.Td>
      <Table.Td>{order.fulfillment_status}</Table.Td>
      <Table.Td>{convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}</Table.Td>
    </Table.Tr>
    </>
  )
}

export default OrderLine
