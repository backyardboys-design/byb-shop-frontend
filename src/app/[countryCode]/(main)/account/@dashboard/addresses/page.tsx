import { Metadata } from "next"
import { notFound } from "next/navigation"


import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { Container, Divider, Title } from "@mantine/core"
import AddressBook from "@/components/account/AddressBook/AddressBook"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <>
      <Title order={1} c="white" fw={500}>
        Adressen
      </Title>
      <Divider color="white" mt="md" />
      <Container size="100%" p={0} >
        <AddressBook customer={customer} region={region} />
      </Container>
    </>
  )
}
