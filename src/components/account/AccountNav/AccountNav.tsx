"use client"
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink"
import { signout } from "@/lib/data/customer"
import {
  Box,
  Group,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core"
import { HttpTypes } from "@medusajs/types"
import {
  IconHistory,
  IconHome,
  IconLayoutDashboard,
  IconLogout,
  IconUser,
} from "@tabler/icons-react"
import { useParams, usePathname } from "next/navigation"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }
  return (
    <>
      {customer && (
        <Box visibleFrom="md">
          <Stack gap={28}>
            <Text fw={500} tt="uppercase" size="md">
              Mein Konto
            </Text>

            <Stack gap={18}>
              <AccountNavLink
                label="Übersicht"
                icon={IconLayoutDashboard}
                href={"/account"}
                route={route}
              />
              <AccountNavLink
                label="Profil"
                icon={IconUser}
                href={"/account/profile"}
                route={route}
              />
              <AccountNavLink
                label="Adressen"
                icon={IconHome}
                href={"/account/addresses"}
                route={route}
              />
              <AccountNavLink
                label="Bestellhistorie"
                icon={IconHistory}
                href={"/account/orders"}
                route={route}
              />

              <UnstyledButton
                onClick={handleLogout}
                style={{
                  display: "block",
                  borderRadius: 18,
                  background: "transparent",
                  padding: "16px 18px",
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.background =
                    "var(--mantine-color-dark-8)"
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.background = "transparent"
                }}
              >
                <Group gap="md" wrap="nowrap">
                  <ThemeIcon variant="transparent" color="white" size={26}>
                    <IconLogout size={20} stroke={2} />
                  </ThemeIcon>

                  <Text
                    style={{
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Abmelden
                  </Text>
                </Group>
              </UnstyledButton>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Mobile */}
      <Box hiddenFrom="md">
        <Stack gap={0}>
          {/* {menuItems
            .filter((item) => item.href !== "/account")
            .map((item) => {
              const Icon = item.icon!
              const active = isActive(pathname, item.href)

              return (
                <Box key={item.href}>
                  <Group
                    component={Link}
                    href={item.href}
                    justify="space-between"
                    wrap="nowrap"
                    py="lg"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Group gap="sm" wrap="nowrap">
                      <ThemeIcon
                        variant="transparent"
                        color={active ? "white" : "gray"}
                        size={22}
                      >
                        <Icon size={18} />
                      </ThemeIcon>

                      <Text
                        fw={active ? 500 : 400}
                        c={active ? "white" : "gray.2"}
                        size="lg"
                      >
                        {item.label}
                      </Text>
                    </Group>

                    <IconChevronRight size={18} color="#b8b8b8" />
                  </Group>

                  <Divider color="gray.8" />
                </Box>
              )
            })} */}
        </Stack>
      </Box>
    </>
  )
}
type AccountNavLinkProps = {
  label: string
  icon: any
  href: string
  route: string
}

const AccountNavLink = ({ label, icon, href, route }: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()
  const Icon = icon

  const active = route.split(countryCode)[1] === href
  return (
    <UnstyledButton
      component={LocalizedLink}
      href={href}
      style={{
        display: "block",
        borderRadius: 18,
        background: active ? "var(--mantine-color-dark-8)" : "transparent",
        padding: "16px 18px",
      }}
      onMouseEnter={(e: any) => {
        if (!active)
          e.currentTarget.style.background = "var(--mantine-color-dark-8)"
      }}
      onMouseLeave={(e: any) => {
        if (!active) e.currentTarget.style.background = "transparent"
      }}
    >
      <Group gap="md" wrap="nowrap">
        <ThemeIcon variant="transparent" color="white" size={26}>
          <Icon size={20} stroke={2} />
        </ThemeIcon>

        <Text
          style={{
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  )
}

export default AccountNav
