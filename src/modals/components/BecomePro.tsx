import { ContextModalProps } from "@mantine/modals"
import { Button, Group, Text } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import generateCheckoutLink from "src/features/payments/mutations/generateCheckoutLink"
import { openUrlInNewTab } from "src/utils/utils"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { paymentPlans } from "src/features/payments/config"

type InnerProps = {
  price: number
}

export const BecomeProModalComponent: React.FC<ContextModalProps<InnerProps>> = ({
  context,
  id,
}) => {
  const handleCloseModal = () => context.closeModal(id)

  const user = useCurrentUser()

  const PaymentPlan: React.FC<{ plan: (typeof paymentPlans)[0] }> = ({ plan }) => {
    const [$generateCheckoutLink, { isLoading }] = useMutation(generateCheckoutLink)
    const choosePlan = async ({ variantId }) => {
      try {
        const checkoutUrl = await $generateCheckoutLink({ variantId })
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
      <Button
        key={plan.variantId}
        onClick={() => choosePlan({ variantId: plan.variantId })}
        disabled={isLoading}
        style={{ width: "100%" }}
        loading={isLoading}
      >
        {plan.name}, {plan.amount} SEK, {plan.description}
      </Button>
    )
  }

  return (
    <Group style={{ width: "100%" }}>
      {!user?.hasLifetimeAccess && (
        <>
          <div style={{ marginBottom: 15 }}>Choose your plan</div>
          {paymentPlans.map((plan) => (
            <PaymentPlan key={plan.variantId} plan={plan} />
          ))}
          <Group justify="space-between"></Group>
        </>
      )}
      {user?.hasLifetimeAccess && (
        <Group justify="space-between">
          <Text>You already have lifetime access to pro features</Text>
        </Group>
      )}
    </Group>
  )
}
