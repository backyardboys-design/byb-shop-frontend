import { Suspense } from "react"

import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Group,
  Image,
  Indicator,
} from "@mantine/core"
import classes from "./Header.module.css"
import NextImage from "next/image"

import Logo from "../../../../public/logo.png"
import { IconShoppingCart, IconUser } from "@tabler/icons-react"
import SideMenu from "../SideMenu/SideMenu"
import HeaderMenu from "../HeaderMenu/HeaderMenu"
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink"
import CartButton from "../CartButton/CartButton"
import { CartDrawerProvider } from "../CartDrawer/CartDrawerContext"

const Header = () => {
  return (
    <CartDrawerProvider>
      <Box className={classes.fixed}>
        <header className={classes.header}>
          <Container size="xl">
            <div className={classes.inner}>
              <Group justify="center" grow hiddenFrom="md" w="100%">
                <SideMenu />
                <Anchor component={LocalizedLink} href="/">
                  <Image
                    h={65}
                    w="auto"
                    fit="contain"
                    component={NextImage}
                    quality={80}
                    src={Logo}
                    ml="auto"
                    mr="auto"
                    alt="BACKYARDBOYS"
                  />
                </Anchor>
                <Group justify="flex-end">
                  <ActionIcon
                    variant="transparent"
                    size="xl"
                    color="white"
                    component={LocalizedLink}
                    href="/account"
                  >
                    <IconUser
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <Suspense
                    fallback={
                      <Indicator
                        inline
                        label="0"
                        color="cyan"
                        offset={10}
                        size={16}
                      >
                        <ActionIcon
                          variant="transparent"
                          size="xl"
                          color="white"
                        >
                          <IconShoppingCart
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Indicator>
                    }
                  >
                    <CartButton />
                  </Suspense>
                </Group>
              </Group>
              <Group justify="space-between" visibleFrom="md" w="100%">
                <Anchor component={LocalizedLink} href="/">
                  <Image
                    h={65}
                    w="auto"
                    fit="contain"
                    component={NextImage}
                    quality={80}
                    src={Logo}
                    alt="BACKYARDBOYS"
                  />
                </Anchor>
                <HeaderMenu />
                <Group justify="flex-end">
                  <ActionIcon
                    variant="transparent"
                    size="xl"
                    color="white"
                    component={LocalizedLink}
                    href="/account"
                  >
                    <IconUser
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <Suspense
                    fallback={
                      <ActionIcon variant="transparent" size="xl" color="white">
                        <IconShoppingCart
                          style={{ width: "70%", height: "70%" }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    }
                  >
                    <CartButton />
                  </Suspense>
                </Group>
              </Group>
            </div>
          </Container>
        </header>
      </Box>
    </CartDrawerProvider>
  )
}
export default Header
