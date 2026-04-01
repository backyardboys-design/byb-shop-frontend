"use client"
import { useEffect, useState, useActionState } from "react"

import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"
import {
  Button,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  IconAsterisk,
  IconBuilding,
  IconHome,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react"
import CountrySelect from "@/components/checkout/CountrySelect/CountrySelect"
import { SubmitButton } from "@/components/checkout/SubmitButton/SubmitButton"
import ErrorMessage from "@/components/checkout/ErrorMessage/ErrorMessage"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const [opened, { open, close: closeModal }] = useDisclosure(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <Button
        onClick={open}
        variant="gradient"
        gradient={{ from: "grape", to: "indigo", deg: 145 }}
        radius="md"
        size="lg"
        mt="md"
        data-testid="add-address-button"
      >
        Neue Adresse hinzufügen
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title={
          <Text c="white" fw={500}>
            Neue Adresse hinzufügen
          </Text>
        }
        centered
      >
        <form action={formAction}>
          <Stack gap="lg">
            <Group justify="space-between" grow>
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
            </Group>
            <TextInput
              label="Unternehmen"
              name="company"
              placeholder="Unternehmen"
              leftSection={<IconBuilding size={20} />}
              radius="md"
              variant="filled"
              size="md"
              autoComplete="organization"
              data-testid="company-input"
            />
            <TextInput
              required
              label="Adresse"
              name="address_1"
              placeholder="Adresse"
              leftSection={<IconHome size={20} />}
              radius="md"
              variant="filled"
              size="md"
              autoComplete="address-line1"
              data-testid="address-1-input"
              withAsterisk
            />
            <TextInput
              label="Apartment, suite, etc."
              name="address_2"
              placeholder="Apartment, suite, etc."
              radius="md"
              variant="filled"
              size="md"
              autoComplete="address-line2"
              data-testid="address-2-input"
            />
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <TextInput
                  required
                  label="Postleitzahl/ ZIP Code"
                  name="postal_code"
                  placeholder="Postleitzahl/ ZIP Code"
                  leftSection={<IconAsterisk size={20} />}
                  radius="md"
                  variant="filled"
                  size="md"
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <TextInput
                  required
                  label="Stadt"
                  name="city"
                  placeholder="Stadt"
                  leftSection={<IconMapPin size={20} />}
                  radius="md"
                  variant="filled"
                  size="md"
                  autoComplete="locality"
                  data-testid="city-input"
                  withAsterisk
                />
              </Grid.Col>
            </Grid>
            <TextInput
              label="Provinz / Bundesland"
              name="province"
              placeholder="Provinz / Bundesland"
              radius="md"
              variant="filled"
              size="md"
              type="tel"
              autoComplete="address-level1"
              data-testid="state-input"
            />
            <CountrySelect
              region={region}
              name="country_code"
              required
              autoComplete="country"
              data-testid="country-select"
            />
            <TextInput
              label="Telefonnummer"
              name="phone"
              placeholder="Telefonnummer (+430123456789)"
              leftSection={<IconPhone size={20} />}
              radius="md"
              variant="filled"
              size="md"
              type="tel"
              autoComplete="phone"
              data-testid="phone-input"
            />
            {formState.error && <ErrorMessage error={formState.error} />}
            <Group justify="space-between" grow mt="md">
              <SubmitButton data-testid="reset-button" size="lg">
                Adresse hinzufügen
              </SubmitButton>
              <Button variant="outline" color="white" size="lg" onClick={close}>
                Abbrechen
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
