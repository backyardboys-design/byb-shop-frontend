import AccountLayout from "@/components/account/AccountLayout/AccountLayout"
import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}
