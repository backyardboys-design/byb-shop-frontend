import { Disclosure } from "@headlessui/react"
import { Badge, clx } from "@medusajs/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"
import {
  Alert,
  Button,
  Center,
  Collapse,
  Group,
  Stack,
  Text,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCircleCheck, IconExclamationCircle } from "@tabler/icons-react"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  "data-testid"?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const [state, { close, toggle }] = useDisclosure(false)
  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <>
      <Group justify="space-between" grow data-testid={dataTestid} mt="md">
        <Stack gap={4}>
          <Text fw={500} c="white">
            {label}:
          </Text>
          {typeof currentInfo === "string" ? (
            <Text data-testid="current-info">{currentInfo}</Text>
          ) : (
            currentInfo
          )}
        </Stack>
        <Group justify="flex-end">
          <Center h="100%">
            <Button
              size="sm"
              type={state ? "reset" : "button"}
              variant={state ? "outline" : "gradient"}
              radius="md"
              onClick={handleToggle}
              gradient={{ from: "grape", to: "indigo", deg: 145 }}
              color="white"
              data-testid="edit-button"
              data-active={state}
            >
              {state ? "Abbrechen" : "Beareiten"}
            </Button>
          </Center>
        </Group>
      </Group>
      <Collapse in={isSuccess || false} mt="md">
        <Alert
          variant="light"
          color="green"
          title={`${label} wurde aktualisiert.`}
          icon={<IconCircleCheck />}
        />
      </Collapse>
      <Collapse in={isError || false} mt="md">
        <Alert
          variant="light"
          color="red"
          title={errorMessage}
          icon={<IconExclamationCircle />}
        />
      </Collapse>
      <Collapse in={state} mt="md">
        {children}
        <Group justify="flex-end" mt="md">
          <Button
            loading={pending}
            type="submit"
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 145 }}
            data-testid="save-button"
          >
            Speichern
          </Button>
        </Group>
      </Collapse>
    </>
  )
}

export default AccountInfo
