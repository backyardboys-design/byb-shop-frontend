"use client"

import React, { useEffect, useActionState } from "react"
import Input from "@modules/common/components/input"
import { HttpTypes } from "@medusajs/types"
import { toast } from "@medusajs/ui"
import AccountInfo from "./AccountInfo"
import { Grid, PasswordInput } from "@mantine/core"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: Add support for password updates
  const updatePassword = async () => {
    toast.info("Password update is not implemented")
  }

  const clearState = () => {
    setSuccessState(false)
  }

  return (
    <form
      action={updatePassword}
      onReset={() => clearState()}
      className="w-full"
    >
      <AccountInfo
        label="Passwort"
        currentInfo="Passwort wird aus Sicherheitsgründen nicht angezeigt."
        isSuccess={successState}
        isError={false}
        errorMessage={undefined}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <Grid>
          <Grid.Col span={12}>
            <PasswordInput
              required
              label="Aktuelles Passwort"
              name="old_password"
              placeholder="Aktuelles Passwort"
              radius="md"
              variant="filled"
              size="md"
              data-testid="old-password-input"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <PasswordInput
              required
              label="Neues Passwort"
              name="new_password"
              placeholder="Neues Passwort"
              radius="md"
              variant="filled"
              size="md"
              data-testid="new-password-input"
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <PasswordInput
              required
              label="Neues Passwort wiederholen"
            name="confirm_password"
              placeholder="Neues Passwort wiederholen"
              radius="md"
              variant="filled"
              size="md"
            data-testid="confirm-password-input"
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </AccountInfo>
    </form>
  )
}

export default ProfilePassword
