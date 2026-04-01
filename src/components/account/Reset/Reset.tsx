import {
    Button,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { LOGIN_VIEW } from "../LoginLayout/LoginLayout"
import { useActionState } from "react"
import ErrorMessage from "@/components/checkout/ErrorMessage/ErrorMessage"
import { SubmitButton } from "@/components/checkout/SubmitButton/SubmitButton"
import { IconLock } from "@tabler/icons-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Reset = ({ setCurrentView }: Props) => {
  return (
    <Container size="sm">
      <Title order={1} ta="center" c="white">
        Haben Sie Ihr Passswort vergessen?
      </Title>
      <Text size="xl" ta="center">
        Wir senden Ihnen eine E-Mail, um Ihr Passwort zurückzusetzen.
      </Text>
      <form>
        <Stack gap="lg" mt="md">
          <TextInput
            required
            label="Email"
            name="email"
            type="email"
            placeholder="Geben Sie Ihre E-Mail-Adresse ein"
            leftSection={<IconLock size={20} />}
            radius="md"
            variant="filled"
            size="md"
            autoComplete="email"
            data-testid="email-input"
            withAsterisk
          />
          <ErrorMessage error={""} data-testid="login-error-message" />
          <Group justify="space-between" grow mt="md">
            <SubmitButton data-testid="reset-button" size="lg">
              Senden
            </SubmitButton>
            <Button variant="outline" color="white" size="lg"
            radius="md"
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}>Abbrechen</Button>
          </Group>
        </Stack>
      </form>
    </Container>
  )
}
export default Reset
