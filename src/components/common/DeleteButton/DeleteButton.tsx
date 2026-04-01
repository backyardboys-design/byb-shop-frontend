import { deleteLineItem } from "@lib/data/cart"
import { ActionIcon } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <ActionIcon variant="subtle" color="gray" size="lg" aria-label="delete" onClick={() => handleDelete(id)} loading={isDeleting}>
      <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  )
}

export default DeleteButton
