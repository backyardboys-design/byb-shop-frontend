"use client"
import { login } from "@lib/data/customer"
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
import { IconAt, IconLock } from "@tabler/icons-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <Container size="sm">
      <Title order={1} ta="center" c="white">
        Anmelden
      </Title>
      <form action={formAction}>
        <Stack gap="lg" mt="md">
          <TextInput
            required
            label="Email"
            name="email"
            type="email"
            placeholder="Geben Sie Ihre E-Mail-Adresse ein"
            leftSection={<IconAt size={20} />}
            radius="md"
            variant="filled"
            size="md"
            autoComplete="email"
            data-testid="email-input"
            withAsterisk
          />
          <PasswordInput
            required
            label="Passwort"
            name="password"
            placeholder="Geben Sie Ihr Passwort ein"
            leftSection={<IconLock size={20} />}
            radius="md"
            variant="filled"
            size="md"
            autoComplete="current-password"
            data-testid="password-input"
            withAsterisk
          />
          <ErrorMessage error={message} data-testid="login-error-message" />
          <Text size="xs" ta="right" >
            <UnstyledButton
            component={Text}
              onClick={() => setCurrentView(LOGIN_VIEW.RESET)}
              data-testid="register-button"
              size="xs" 
              span
              td="underline"
              
            >
              Haben Sie Ihr Passwort vergessen?
            </UnstyledButton>
          </Text>
          <SubmitButton data-testid="sign-in-button" size="lg">Anmelden</SubmitButton>
          <Text ta="center">
            Sie sind ein neuer Kunde?{" "}
            <UnstyledButton
              component={Text}
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="underline"
              span
              td="underline"
            >
              Konto erstellen
            </UnstyledButton>
          </Text>
        </Stack>
      </form>
    </Container>
  )
}

export default Login
