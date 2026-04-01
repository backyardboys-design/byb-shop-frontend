"use client"

import { useActionState } from "react"
import { createTransferRequest } from "@lib/data/orders"
import { Heading, Input, IconButton } from "@medusajs/ui"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { useEffect, useState } from "react"
import { Alert, Grid, Group, Stack, Text, TextInput } from "@mantine/core"
import { SubmitButton } from "@/components/checkout/SubmitButton/SubmitButton"
import { IconCircleCheck, IconExclamationCircle } from "@tabler/icons-react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <Grid mt="md">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack gap={4}>
          <Text fw={500} c="white">
            Bestellung transferieren
          </Text>
          <Text>
            Sie finden die gesuchte Bestellung nicht?
            <br />
            Verknüpfen Sie eine Bestellung mit Ihrem Konto.
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <form action={formAction}>
          <TextInput
          leftSection={<Text fw={500}>BYB-</Text>}
            required
            name="order_id"
            placeholder="Bestellungs-Nr"
            radius="md"
            variant="filled"
            size="md"
            autoComplete="phone"
            data-testid="phone-input"
            withAsterisk
          />
          <Group justify="flex-end" mt="md">
            <SubmitButton>Transfer anfordern</SubmitButton>
          </Group>
        </form>
      </Grid.Col>
      {showSuccess || state.error ? (
        <Grid.Col span={12} mt="md">
          {!state.success && state.error && (
            <Alert
              variant="light"
              color="red"
              title={state.error}
              icon={<IconExclamationCircle />}
            />
          )}
          {showSuccess && (
            <Alert
              variant="light"
              color="green"
              title={`Transfer für Bestellung ${state.order?.id} angefordert`}
              icon={<IconCircleCheck />}
              withCloseButton
              onClose={() => setShowSuccess(false)}
            >
              Transferanfrage an {state.order?.email} gesendet.
            </Alert>
          )}
        </Grid.Col>
      ) : (
        <></>
      )}
    </Grid>
  )
}
