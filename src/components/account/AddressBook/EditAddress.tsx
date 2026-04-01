"use client"

import React, { useEffect, useState, useActionState, use } from "react"

import { HttpTypes } from "@medusajs/types"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"
import {
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import {
  IconAsterisk,
  IconBuilding,
  IconEdit,
  IconHome,
  IconMapPin,
  IconPhone,
  IconTrash,
} from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import ErrorMessage from "@/components/checkout/ErrorMessage/ErrorMessage"
import CountrySelect from "@/components/checkout/CountrySelect/CountrySelect"
import { SubmitButton } from "@/components/checkout/SubmitButton/SubmitButton"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [opened, { open, close: closeModal }] = useDisclosure(false)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (!opened) {
      setFormKey((k) => k + 1)
    }
  }, [opened])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }
  return (
    <>
      <Grid c="white" mt="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Title order={4}>
            {address.first_name} {address.last_name}
          </Title>
          {address.company && (
            <Text data-testid="address-company">{address.company}</Text>
          )}
          <Space h="sm" />
          <Text>
            {address.address_1}
            {address.address_2 && `, ${address.address_2}`}
          </Text>
          <Text>
            {address.postal_code}, {address.city}
          </Text>
          <Text>
            {address.province && `${address.province}, `}
            {address.country_code?.toUpperCase()}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Center h="100%" visibleFrom="md">
            <Group justify="flex-end" w="100%">
              <Button
                onClick={open}
                variant="gradient"
                gradient={{ from: "grape", to: "indigo", deg: 145 }}
                radius="md"
                leftSection={<IconEdit size={14} />}
                data-testid="address-edit-button"
                loading={removing}
              >
                Bearbeiten
              </Button>
              <Button
                variant="outline"
                color="white"
                radius="md"
                leftSection={<IconTrash size={14} />}
                onClick={removeAddress}
                data-testid="address-delete-button"
                loading={removing}
              >
                Löschen
              </Button>
            </Group>
          </Center>
          <Group hiddenFrom="md">
            <Button
              onClick={open}
              variant="gradient"
              gradient={{ from: "grape", to: "indigo", deg: 145 }}
              radius="md"
              leftSection={<IconEdit size={14} />}
              data-testid="address-edit-button"
              loading={removing}
            >
              Bearbeiten
            </Button>
            <Button
              variant="outline"
              color="white"
              radius="md"
              leftSection={<IconTrash size={14} />}
              onClick={removeAddress}
              data-testid="address-delete-button"
              loading={removing}
            >
              Löschen
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Divider color="white" mt="md" />

      <EditModal
        key={formKey}
        opened={opened}
        closeModal={closeModal}
        address={address}
        region={region}
      />
    </>
  )
}

const EditModal = ({
  opened,
  closeModal,
  address,
  region,
}: {
  opened: boolean
  closeModal: any
  address: HttpTypes.StoreCustomerAddress
  region: HttpTypes.StoreRegion
}) => {
  const [successState, setSuccessState] = useState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
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
    <Modal
      opened={opened}
      onClose={close}
      data-testid="edit-address-modal"
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
              defaultValue={address.first_name || undefined}
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
              defaultValue={address.last_name || undefined}
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
            defaultValue={address.company || undefined}
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
            defaultValue={address.address_1 || undefined}
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
            defaultValue={address.address_2 || undefined}
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
                defaultValue={address.postal_code || undefined}
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
                defaultValue={address.city || undefined}
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
            defaultValue={address.province || undefined}
            data-testid="state-input"
          />
          <CountrySelect
            region={region}
            name="country_code"
            required
            autoComplete="country"
            defaultValue={address.country_code || undefined}
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
            defaultValue={address.phone || undefined}
            data-testid="phone-input"
          />
          {formState.error && <ErrorMessage error={formState.error} />}
          <Group justify="space-between" grow mt="md">
            <SubmitButton data-testid="reset-button" size="lg">
              Adresse aktualisieren
            </SubmitButton>
            <Button variant="outline" color="white" size="lg" onClick={close}>
              Abbrechen
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}

export default EditAddress
