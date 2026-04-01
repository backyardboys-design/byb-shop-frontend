import { Alert } from "@mantine/core"
import { IconExclamationCircle } from "@tabler/icons-react"

const ErrorMessage = ({
  error,
  "data-testid": dataTestid,
}: {
  error?: string | null
  "data-testid"?: string
}) => {
  if (!error) {
    return null
  }

  return (
    <Alert
      variant="light"
      color="red"
      radius="md"
      title={error}
      icon={<IconExclamationCircle />}
      data-testid={dataTestid}
    ></Alert>
  )
}

export default ErrorMessage
