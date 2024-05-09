import { ContextModalProps } from "@mantine/modals"
import { Button, Group } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import generateCheckoutLink from "src/features/payments/mutations/generateCheckoutLink"

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

  const [$generateCheckoutLink] = useMutation(generateCheckoutLink, {})

  const onPurchaseClick = async () => {
    const checkoutUrl = await $generateCheckoutLink()
  }

  return (
    <Group style={{ width: "100%" }}>
      <div style={{ marginBottom: 15 }}>You can purchase pro for ${price} per month</div>
      <Group justify="space-between">
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>

        <Button onClick={onPurchaseClick}>Purchase</Button>
      </Group>
    </Group>
  )
}
