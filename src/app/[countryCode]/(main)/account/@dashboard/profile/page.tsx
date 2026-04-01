import { Metadata } from "next"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { Container, Divider, Title } from "@mantine/core"
import ProfileName from "@/components/account/AccountProfile/ProfileName"
import ProfileEmail from "@/components/account/AccountProfile/ProfileEmail"
import ProfilePhone from "@/components/account/AccountProfile/ProfilePhone"
import ProfilePassword from "@/components/account/AccountProfile/ProfilePassword"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  console.log(customer)

  if (!customer || !regions) {
    notFound()
  }

  return (
    <>
      <Title order={1} c="white" fw={500}>
        Profil
      </Title>
      <Divider color="white" mt="md" />
      <Container size="100%" p={0}>
        <ProfileName customer={customer} />
        <Divider color="white" mt="md" />

        <ProfileEmail customer={customer} />
        <Divider color="white" mt="md" />

        <ProfilePhone customer={customer} />
        <Divider color="white" mt="md" />

        <ProfilePassword customer={customer} />
        <Divider color="white" mt="md" />
      </Container>
    </>
  )
}
