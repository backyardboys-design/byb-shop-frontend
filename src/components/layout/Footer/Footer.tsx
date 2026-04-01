"use client";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Anchor,
  Container,
  Grid,
  GridCol,
  Group,
  Text,
} from "@mantine/core";
import classes from "./Footer.module.css";
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <Container size="xl">
        <Grid>
          <GridCol span={{ base: 12, md: 4 }}>
            <div className={classes.wrapper}>
              <Text className={classes.title}>BESTELLUNG</Text>
              <Anchor
                className={classes.link}
                component={LocalizedLink}
                href="/hilfe-zum-bestellvorgang"
              >
                Hilfe zum Bestellvorgang
              </Anchor>
              <Anchor
                className={classes.link}
                component={LocalizedLink}
                href="/versandzeiten-kosten"
              >
                Versandzeiten & Kosten
              </Anchor>

              <Anchor
                className={classes.link}
                component={LocalizedLink}
                href="/zahlung"
              >
                Zahlungsarten
              </Anchor>
            </div>
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }}>
            <div className={classes.wrapper}>
              <Text className={classes.title}>HILFE</Text>

              <Anchor
                className={classes.link}
                component={LocalizedLink}
                href="/ruecksendung"
              >
                Rücksendung
              </Anchor>
              <Anchor className={classes.link} component={LocalizedLink} href="/faq">
                FAQ
              </Anchor>
              <Anchor
                className={classes.link}
                component={LocalizedLink}
                href="/anfragen"
              >
                Anfragen
              </Anchor>
            </div>
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }}>
            <div className={classes.wrapper}>
              <Text className={classes.title}>Kontaktiere Uns</Text>
              <Anchor className={classes.link} href="tel:+436706516029">
                +43 670 6516029
              </Anchor>
              <Anchor
                className={classes.link}
                href="mailto:office@backyardboys.at"
              >
                office@backyardboys.at
              </Anchor>
              <Anchor
                className={classes.link}
                target="_blank"
                href="https://wa.me/436706516029"
              >
                WhatsApp
              </Anchor>
            </div>
          </GridCol>
        </Grid>
      </Container>
      <Container size="xl" className={classes.afterFooter}>
        <Grid>
          <GridCol span={{ base: 12, md: 4 }}>
            <Group justify="flex-start" wrap="nowrap" visibleFrom="md">
              <Anchor
                c="dimmed"
                component={LocalizedLink}
                href="/datenschutz"
                lh={1}
                size="sm"
              >
                Datenschutzerklärung
              </Anchor>
              <Anchor
                c="dimmed"
                component={LocalizedLink}
                href="/agb"
                lh={1}
                size="sm"
              >
                AGB
              </Anchor>
              <Anchor
                c="dimmed"
                component={LocalizedLink}
                href="/wiederrufsrecht"
                lh={1}
                size="sm"
              >
                Wiederrufsrecht
              </Anchor>
              <Anchor
                c="dimmed"
                component={LocalizedLink}
                href="/impressum"
                lh={1}
                size="sm"
              >
                Impressum
              </Anchor>
            </Group>
            <Group justify="center" wrap="nowrap" hiddenFrom="md">
              <Anchor c="dimmed" component={LocalizedLink} href="" lh={1} size="sm">
                Datenschutzerklärung
              </Anchor>
              <Anchor c="dimmed" component={LocalizedLink} href="" lh={1} size="sm">
                AGB
              </Anchor>
              <Anchor c="dimmed" component={LocalizedLink} href="" lh={1} size="sm">
                Wiederrufsrecht
              </Anchor>
              <Anchor c="dimmed" component={LocalizedLink} href="" lh={1} size="sm">
                Impressum
              </Anchor>
            </Group>
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }}>
            <Group
              gap={0}
              className={classes.social}
              justify="center"
              wrap="nowrap"
            >
              <ActionIcon
                size="lg"
                color="gray"
                variant="subtle"
                aria-label="Instagram"
              >
                <IconBrandInstagram size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                color="gray"
                variant="subtle"
                aria-label="Youtube"
              >
                <IconBrandYoutube size={18} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                color="gray"
                variant="subtle"
                aria-label="Discord"
              >
                <IconBrandDiscord size={18} stroke={1.5} />
              </ActionIcon>
            </Group>
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }}>
            <Group justify="flex-end" wrap="nowrap" visibleFrom="md">
              <Text c="dimmed" size="sm">
                © {year} Backyardboys OG. All rights reserved.
              </Text>
            </Group>
            <Group justify="center" wrap="nowrap" hiddenFrom="md">
              <Text c="dimmed" size="sm">
                © {year} Backyardboys OG. All rights reserved.
              </Text>
            </Group>
          </GridCol>
        </Grid>
      </Container>
    </footer>
  );
};
export default Footer;
