"use client"
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  Image,
  Indicator,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { HttpTypes } from "@medusajs/types"
import { IconShoppingCart } from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import classes from "./CartDrawer.module.css"
import { convertToLocale } from "@/lib/util/money"
import LineItemOptions from "@/modules/common/components/line-item-options"
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink"
import DeleteButton from "@/components/common/DeleteButton/DeleteButton"
import LineItemPrice from "@/components/common/LineItemPrice/LineItemPrice"
import LineItemQuantitySelect from "@/components/common/LineItemQuantitySelect/LineItemQuantitySelect"
import { useCartDrawer } from "./CartDrawerContext"
import NextImage from "next/image"
import LineItemMetadata from "@/components/common/LineItemMetadata/LineItemMetadata"

const CartDrawer = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0
  const items = cartState?.items?.length
  const subtotal = cartState?.item_subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)
  const prevTotalItemsRef = useRef(totalItems)
  const pathname = usePathname()
  const { opened, open, close, toggle } = useCartDrawer()

  useEffect(() => {
    const hasItemCountChanged = prevTotalItemsRef.current !== totalItems

    if (hasItemCountChanged && !pathname.includes("/cart") && !opened) {
      open()
    }

    prevTotalItemsRef.current = totalItems
  }, [totalItems, pathname, opened, itemRef])

  useEffect(() => {
    if (opened) {
      close()
    }
  }, [pathname])

  return (
    <>
      <Indicator
        inline
        label={items}
        offset={10}
        size={20}
        disabled={!(cartState && cartState.items?.length)}
        processing
        color="grape"
        onClick={toggle}
      >
        <ActionIcon variant="transparent" size="xl" color="white">
          <IconShoppingCart
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Indicator>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Text c="white" fw={500}>
            WARENKORB{" "}
            {totalItems ? (
              <Text span c="dimmed">
                ({totalItems} ARTIKEL)
              </Text>
            ) : null}
          </Text>
        }
        position="right"
        size="lg"
        offset={15}
        radius="md"
        className={classes.cart}
        styles={{
          content: {
            borderTopLeftRadius: 18,
            borderBottomLeftRadius: 18,
            overflow: "hidden",
          },
          body: {
            padding: 0,
            height: "calc(100vh - 245px)",
          },
        }}
      >
        {cartState && cartState.items?.length ? (
          <>
            <Box
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ScrollArea
                scrollbarSize={6}
                pl={16}
                pr={16}
                style={{
                  height: "calc(100% - 20px)",
                }}
              >
                {cartState.items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                  })
                  .map((item) => (
                    <Stack gap="md" key={item.id} mt="md">
                      <Group align="flex-start" justify="space-between">
                        <Group align="flex-start">
                          <LocalizedLink
                            href={`/products/${item.product_handle}`}
                          >
                            <Image
                              alt={item.title}
                              component={NextImage}
                              src={item.thumbnail}
                              width={96}
                              height={96}
                              w={96}
                              h={96}
                              radius="md"
                              fit="cover"
                            />
                          </LocalizedLink>
                          <Stack gap={4}>
                            <Text
                              fw={500}
                              component={LocalizedLink}
                              href={`/products/${item.product_handle}`}
                            >
                              {item.title}
                            </Text>
                            {item.metadata && (<LineItemMetadata
                              item={item}
                              data-testid="cart-item-metadata"
                            />)}
                            
                            <LineItemQuantitySelect
                              item={item}
                              currencyCode={cartState?.currency_code}
                            />
                          </Stack>
                        </Group>

                        <Stack gap={2} align="flex-end">
                          <LineItemPrice
                            item={item}
                            currencyCode={cartState.currency_code}
                          />
                          <DeleteButton id={item.id} />
                        </Stack>
                      </Group>

                      <Divider />
                    </Stack>
                  ))}
              </ScrollArea>
            </Box>
            <Box
              bg="var(--mantine-color-body)"
              p={16}
              style={{
                position: "sticky",
                bottom: 0,
                zIndex: 10,
              }}
            >
              <Group justify="space-between" align="flex-end" mb={2}>
                <Title order={3} fw={500}>
                  Zwischensumme
                </Title>

                <Text fw={800} size="xl">
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cartState.currency_code,
                  })}
                </Text>
              </Group>

              <Text c="dimmed" size="sm" mb={22}>
                Exclusive Steuern.{" "}
                <Text
                  component="span"
                  inherit
                  td="underline"
                  style={{ cursor: "pointer" }}
                >
                  Versand
                </Text>{" "}
                wird beim Checkout berechnet.
              </Text>

              <Button
                component={LocalizedLink}
                href="/checkout"
                fullWidth
                variant="gradient"
                gradient={{ from: "grape", to: "indigo", deg: 145 }}
                radius="md"
                size="xl"
              >
                Sicher zur Kasse
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              style={{
                minHeight: "calc(100vh - 110px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              px="xl"
            >
              <Text
                ta="center"
                style={{
                  fontSize: "2.25rem",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                Dein Warenkorb ist leer
              </Text>
            </Box>
            <Box
              p={16}
              style={{
                position: "sticky",
                bottom: 0,
                zIndex: 10,
              }}
            >
              <Button
                onClick={close}
                fullWidth
                variant="gradient"
                gradient={{ from: "grape", to: "indigo", deg: 145 }}
                radius="md"
                size="xl"
              >
                Weiter shoppen
              </Button>
            </Box>
          </>
        )}
      </Drawer>
    </>
  )
}
export default CartDrawer
