import React from "react"

import { HttpTypes } from "@medusajs/types"
import { Box, Group } from "@mantine/core"
import AccountNav from "../AccountNav/AccountNav"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <>
      {customer ? (
        <>
          <Group align="flex-start" wrap="nowrap" gap={0}>
            {/* Sidebar */}
            <Box w={{ base: "100%", md: 240 }} visibleFrom="md">
              <AccountNav customer={customer} />
            </Box>

            {/* Content */}
            <Box flex={1} px={{ base: 0, md: 48 }}>
              {children}
            </Box>
          </Group>

          {/* Mobile Nav (optional separat) */}
          <Box hiddenFrom="md" mb="md">
            <AccountNav customer={customer} />
          </Box>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default AccountLayout
