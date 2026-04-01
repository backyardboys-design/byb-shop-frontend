"use client";
import {
  Box,
  Burger,
  Card,
  Center,
  Collapse,
  Drawer,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./SideMenu.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink";

const SideMenu = () => {
  const pathname = usePathname();

  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedDekor, { toggle: toggleDekor, close: closeDekor }] =
    useDisclosure(false);
  const [openedClothing, { toggle: toggleClothing, close: closeClothing }] =
    useDisclosure(false);
  const [
    openedAccessories,
    { toggle: toggleAccessories, close: closeAccessories },
  ] = useDisclosure(false);

  useEffect(() => {
    close();
    closeDekor();
    closeClothing();
    closeAccessories();
  }, [pathname]);

  const MenuPoints = [
    {
      title: "BIKE DESIGNS",
      opened: openedDekor,
      toggle: toggleDekor,
      links: [
        {
          title: "FULL CUSTOM DESIGN",
          description: "PREMIUM DEKOR",
          img: "/menu/full-custom.png",
          link: "/products/anzahlung-full-custom-dekor-kit",
        },
        {
          title: "SEMi CUSTOM DESIGNS",
          description: "PREMIUM DEKOR",
          img: "/menu/semi-custom.png",
          link: "/collections/semi-custom-designs",
        },
        {
          title: "REPRINT OF DESIGN",
          description: "PREMIUM DEKOR",
          img: "/menu/reprint-graphics.png",
          link: "/products/reprint-dekor-kit",
        },
      ],
    },
    {
      title: "CLOTHING",
      opened: openedClothing,
      toggle: toggleClothing,
      links: [
        {
          title: "ALL CLOTHING",
          description: "STREETWEAR",
          img: "/menu/all-clothing.png",
          link: "/collections/clothing",
        },
        {
          title: "T-SHIRTS",
          description: "STREETWEAR",
          img: "/menu/shirt.png",
          link: "/collections/t-shirts",
        },
        {
          title: "HOODIES",
          description: "STREETWEAR",
          img: "/menu/hoodie.png",
          link: "/collections/hoodies",
        },
      ],
    },
    {
      title: "ACCESSORIES",
      opened: openedAccessories,
      toggle: toggleAccessories,
      links: [
        {
          title: "STICKER",
          description: "PREMIUM STICKER",
          img: "/menu/sticker.png",
          link: "/collections/sticker",
        },
        {
          title: "AIR FRESHENER",
          description: "PREMIUM AROMAS",
          img: "/menu/air-freshener.png",
          link: "/collections/air-freshener",
        },
        {
          title: "GIFTCARDS",
          description: "TO GIVE AWAY",
          img: "/menu/giftcard.png",
          link: "",
        },
      ],
    },
  ];
  return (
    <>
      <Burger opened={opened} onClick={toggle} size="sm" color="white" />
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        closeButtonProps={{ size: "lg" }}
        hiddenFrom="md"
        zIndex={1000000}
        className={classes.drawer}
      >
        <ScrollArea h="calc(100vh - 110px" mx="-md">
          {MenuPoints.map((item) => {
            return (
              <React.Fragment key={item.title}>
                <a href="#" className={classes.link} onClick={item.toggle}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      {item.title}
                    </Box>
                    <IconChevronDown size={16} color={"white"} />
                  </Center>
                </a>
                <Collapse in={item.opened} m="lg">
                  {item.links.map((link) => {
                    return (
                      <Card
                        key={link.title}
                        radius={0}
                        padding={0}
                        withBorder={false}
                        component={LocalizedLink}
                        href={link.link}
                        mb="xl"
                        bg="dark.9"
                      >
                        <Group gap={0} align="stretch" wrap="nowrap">
                          <Box
                            style={{
                              width: 140,
                              minWidth: 140,
                              height: 90,
                              clipPath:
                                "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
                              overflow: "hidden",
                            }}
                          >
                            <Image
                              src={link.img}
                              h="100%"
                              w="100%"
                              fit="cover"
                            />
                          </Box>
                          <Stack
                            gap={4}
                            justify="center"
                            style={{
                              padding: "0 24px 0 18px",
                              flex: 1,
                            }}
                          >
                            <Text
                              size="xs"
                              fw={500}
                              c="dimmed"
                              tt="uppercase"
                              style={{ letterSpacing: 0.5 }}
                            >
                              {link.description}
                            </Text>

                            <Text
                              size="xl"
                              fw={800}
                              c="white"
                              tt="uppercase"
                              lh={1.1}
                            >
                              {link.title}
                            </Text>
                          </Stack>
                        </Group>
                      </Card>
                    );
                  })}
                </Collapse>
              </React.Fragment>
            );
          })}
        </ScrollArea>
      </Drawer>
    </>
  );
};
export default SideMenu;
