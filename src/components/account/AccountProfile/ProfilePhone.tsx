"use client"

import React, { useEffect, useActionState } from "react"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"
import AccountInfo from "./AccountInfo"
import { Grid, TextInput } from "@mantine/core"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const updateCustomerPhone = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      phone: formData.get("phone") as string,
    }

    try {
      await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useActionState(updateCustomerPhone, {
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
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Telefonnummer"
        currentInfo={customer.phone ? customer.phone : "Keine Telefonnummer"}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
        data-testid="account-phone-editor"
      >
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              required
              label="Telefonnummer"
              name="phone"
              placeholder="Telefonnummer (+430123456789)"
              radius="md"
              variant="filled"
              size="md"
              autoComplete="phone"
              data-testid="phone-input"
              defaultValue={customer.phone ?? ""}
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </AccountInfo>
    </form>
  )
}

export default ProfilePhone
