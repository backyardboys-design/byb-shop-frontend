"use client";
import {
  Box,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./HeaderMenu.module.css";
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink";

const HeaderMenu = () => {
  const pathname = usePathname();
  const [openedDekor, setDekor] = useState(false);
  const [openedClothing, setClothing] = useState(false);
  const [openedAccessories, setAccessories] = useState(false);

  useEffect(() => {
    setDekor(false);
    setClothing(false);
    setAccessories(false);
  }, [pathname]);

  const MenuPoints = [
    {
      title: "BIKE DESIGNS",
      description: "BIKE DEKOR KITS",
      img: "/menu/bike-graphics.png",
      opened: openedDekor,
      set: setDekor,
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
      description: "LIFESTYLE STREETWEAR",
      img: "/menu/clothing.png",
      opened: openedClothing,
      set: setClothing,
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
      description: "ACCESSORIES",
      img: "/menu/accessories.png",
      opened: openedAccessories,
      set: setAccessories,
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
    <Group gap={5}>
      {MenuPoints.map((item) => {
        return (
          <Popover
            key={item.title}
            opened={item.opened}
            onChange={item.set}
            width="100%"
            radius={0}
            position="bottom"
            shadow="none"
            withinPortal
          >
            <Popover.Target
              onMouseEnter={() => item.set(true)}
              onMouseLeave={() => item.set(false)}
              
            >
              <a className={classes.link}>
                <Center inline>
                  <Box component="span" mr={5}>
                    {item.title}
                  </Box>
                  <IconChevronDown size={16} color={"white"} />
                </Center>
              </a>
            </Popover.Target>
            <Popover.Dropdown
              onMouseEnter={() => item.set(true)}
              onMouseLeave={() => item.set(false)}
              style={{ overflow: "hidden" }}
              left={0}
              top={85}
              className={classes.dropdown}
            >
              <Container size="xl" pt="md" pb="md">
                <Grid>
                  <Grid.Col span={{ base: 5 }}>
                    <Box
                      style={{
                        position: "relative",
                        height: 500,
                        overflow: "hidden",
                        backgroundColor: "#ddd",
                        clipPath: "polygon(0 0, 92% 0, 78% 100%, 0 100%)",
                      }}
                    >
                      <Image
                        src={item.img}
                        alt="title"
                        h="100%"
                        w="100%"
                        fit="cover"
                      />

                      <Box
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0) 55%)",
                          pointerEvents: "none",
                        }}
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 7 }} p="lg">
                    <Text size="lg" fw={500} mb="lg">
                      {item.description}
                    </Text>
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
                  </Grid.Col>
                </Grid>
              </Container>
            </Popover.Dropdown>
          </Popover>
        );
      })}
    </Group>
  );
};
export default HeaderMenu;
