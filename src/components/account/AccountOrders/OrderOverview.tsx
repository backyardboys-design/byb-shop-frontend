"use client"

import { Button } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import OrderCard from "@/modules/account/components/order-card"
import { Box, Table } from "@mantine/core"
import OrderLine from "./OrderLine"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <>
        <Box mt="md">
          <Table striped >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Bestellung</Table.Th>
                <Table.Th>Datum</Table.Th>
                <Table.Th>Zahlungsstatus</Table.Th>
                <Table.Th>Auftragsstatus</Table.Th>
                <Table.Th>Gesamtsumme</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {orders.map((o) => (
                <OrderLine key={o.id} order={o} />
              ))}
            </Table.Tbody>
          </Table>
        </Box>
        <div className="flex flex-col gap-y-8 w-full">
          {orders.map((o) => (
            <div
              key={o.id}
              className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
            >
              <OrderCard order={o} />
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4"
      data-testid="no-orders-container"
    >
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button data-testid="continue-shopping-button">
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
