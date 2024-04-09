import { ContextModalProps } from "@mantine/modals"
import { Button, Group } from "@mantine/core"

type InnerProps = {
  price: number
}

export const BecomeProModalComponent: React.FC<ContextModalProps<InnerProps>> = ({
  context,
  id,
  innerProps,
}) => {
  const { price } = innerProps

  const handleCloseModal = () => context.closeModal(id)

  return (
    <Group style={{ width: "100%" }}>
      <div style={{ marginBottom: 15 }}>You can purchase pro for ${price} per month</div>
      <Group justify="space-between">
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>

        <Button
          onClick={() => {
            console.log("submit")
          }}
        >
          Submit
        </Button>
      </Group>
    </Group>
  )
}
