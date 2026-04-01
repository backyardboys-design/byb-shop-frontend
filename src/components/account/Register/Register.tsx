"use client"
import { signup } from "@lib/data/customer"
import {
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { useActionState } from "react"
import ErrorMessage from "@/components/checkout/ErrorMessage/ErrorMessage"
import { SubmitButton } from "@/components/checkout/SubmitButton/SubmitButton"
import { LOGIN_VIEW } from "../LoginLayout/LoginLayout"
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink"
import { IconAt, IconLock, IconPhone } from "@tabler/icons-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <Container size="sm">
      <Title order={1} ta="center" c="white">
        Konto erstellen
      </Title>
      <form action={formAction}>
        <Stack gap="lg" mt="md">
          <TextInput
            required
            label="Vorname"
            name="first_name"
            placeholder="Vorname"
            radius="md"
            variant="filled"
            size="md"
            autoComplete="given-name"
            data-testid="first-name-input"
            withAsterisk
          />
          <TextInput
            required
            label="Nachname"
            name="last_name"
            placeholder="Nachname"
            radius="md"
            variant="filled"
            size="md"
            autoComplete="family-name"
            data-testid="last-name-input"
            withAsterisk
          />
          <TextInput
            required
            label="Email"
            name="email"
            type="email"
            leftSection={<IconAt size={20} />}
            placeholder="Geben Sie Ihre E-Mail-Adresse ein"
            radius="md"
            variant="filled"
            size="md"
            autoComplete="email"
            data-testid="email-input"
            withAsterisk
          />
          <TextInput
            label="Telefonnummer"
            name="phone"
            leftSection={<IconPhone size={20} />}
            placeholder="Telefonnummer (+430123456789)"
            radius="md"
            variant="filled"
            size="md"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <PasswordInput
            required
            label="Passwort"
            name="password"
            leftSection={<IconLock size={20} />}
            placeholder="Passwort"
            radius="md"
            variant="filled"
            size="md"
            autoComplete="new-password"
            data-testid="password-input"
            withAsterisk
          />
          <ErrorMessage error={message} data-testid="register-error" />
          <Text size="xs" ta="right">
            Mit der Erstellung eines Kontos stimmen Sie den Nutzungsbedingungen
            zu.{" "}
            <UnstyledButton
              component={LocalizedLink}
              href="/content/privacy-policy"
              td="underline"
              style={{
                fontSize: "0.75rem",
              }}
            >
              Datenschutzerklärung
            </UnstyledButton>
          </Text>
          <SubmitButton data-testid="register-button" size="lg">
            Konto erstellen
          </SubmitButton>
          <Text ta="center">
            Sind Sie ein wiederkehrender Kunde?{" "}
            <UnstyledButton
              component={Text}
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="underline"
              span
              td="underline"
            >
              Anmelden
            </UnstyledButton>
          </Text>
        </Stack>
      </form>
    </Container>
  )
}

export default Register
