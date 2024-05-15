import { ContextModalProps } from "@mantine/modals"
import { Button, Group, Text } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import generateCheckoutLink from "src/features/payments/mutations/generateCheckoutLink"
import { checkPrimeSync } from "crypto"
import { env } from "src/env.mjs"
import { openUrlInNewTab } from "src/utils/utils"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"

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

  const [$generateCheckoutLink, { isLoading }] = useMutation(generateCheckoutLink, {})

  const user = useCurrentUser()

  const onPurchaseClick = async () => {
    try {
      const checkoutUrl = await $generateCheckoutLink({})
      if (checkoutUrl) {
        await openUrlInNewTab(checkoutUrl)
      } else {
        console.error("Checkout URL is null or undefined")
      }
    } catch (error) {
      console.error("Error generating checkout link:", error)
    }
  }

  return (
    <Group style={{ width: "100%" }}>
      {!user?.hasLifetimeAccess && (
        <>
          <div style={{ marginBottom: 15 }}>You can purchase pro for ${price} per month</div>
          <Group justify="space-between">
            <Button color="gray" onClick={handleCloseModal}>
              Cancel
            </Button>

            <Button loading={isLoading} c="green" onClick={onPurchaseClick}>
              Purchase
            </Button>
          </Group>
        </>
      )}
      {user?.hasLifetimeAccess && (
        <>
          <Group justify="space-between">
            <Text>You already have lifetime access to pro features</Text>
          </Group>
        </>
      )}
    </Group>
  )
}
