import { Metadata } from "next"

import OrderOverviewOld from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import { Container, Divider, Title } from "@mantine/core"
import TransferRequestForm from "@/components/account/AccountOrders/TransferRequestForm"
import OrderOverview from "@/components/account/AccountOrders/OrderOverview"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <>
      <Title order={1} c="white" fw={500}>
        Bestellhistorie
      </Title>
      <Divider color="white" mt="md" />
      <Container size="100%" p={0}>
        <TransferRequestForm />
        <Divider color="white" mt="md" />
        <OrderOverview orders={orders} />
        <Divider color="white" mt="md" />
      </Container>
      <div className="w-full" data-testid="orders-page-wrapper">
        <div>
          <OrderOverviewOld orders={orders} />
          <Divider className="my-16" />
        </div>
      </div>
    </>
  )
}
