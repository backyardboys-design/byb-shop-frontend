"use client"

import React, { useEffect, useActionState } from "react"

import { HttpTypes } from "@medusajs/types"
import AccountInfo from "./AccountInfo"
import { Grid, TextInput } from "@mantine/core"
// import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: It seems we don't support updating emails now?
  const updateCustomerEmail = (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      email: formData.get("email") as string,
    }

    try {
      // await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  } 

  const [state, formAction] = useActionState(updateCustomerEmail, {
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
        label="E-Mail"
        currentInfo={`${customer.email}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
        data-testid="account-email-editor"
      >
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              required
              label="E-Mail"
              name="email"
              placeholder="E-Mail"
              radius="md"
              variant="filled"
              size="md"
              autoComplete="email"
              data-testid="email-input"
              defaultValue={customer.email}
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </AccountInfo>
    </form>
  )
}

export default ProfileEmail
