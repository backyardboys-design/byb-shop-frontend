"use client"

import React, { useEffect, useActionState } from "react"

import Input from "@modules/common/components/input"

import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"
import AccountInfo from "./AccountInfo"
import { Grid, TextInput } from "@mantine/core"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const updateCustomerName = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    try {
      await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useActionState(updateCustomerName, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Vorname"
              name="first_name"
              placeholder="Vorname"
              radius="md"
              variant="filled"
              size="md"
              data-testid="first-name-input"
              defaultValue={customer.first_name ?? ""}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Nachname"
              name="last_name"
              placeholder="Nachname"
              radius="md"
              variant="filled"
              size="md"
            data-testid="last-name-input"
            defaultValue={customer.last_name ?? ""}
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
