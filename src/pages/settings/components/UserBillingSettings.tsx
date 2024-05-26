import { useQuery } from "@blitzjs/rpc"
import { Badge, Button, Card, Stack, Text, Title } from "@mantine/core"
import getSubscriptions from "src/features/payments/lemon-squeezy-subscriptions/queries/getSubscriptions"
import React from "react"
import { LemonSqueezySubscriptionStatus } from "@prisma/client"
import { openUrlInNewTab } from "src/utils/utils"

// Utility function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

// Component to display individual subscription details
const SubscriptionCard = ({ subscription }) => {
  const statusMap = {
    [LemonSqueezySubscriptionStatus.active]: { label: "Active", color: "green" },
    [LemonSqueezySubscriptionStatus.cancelled]: { label: "Cancelled", color: "red" },
    [LemonSqueezySubscriptionStatus.expired]: { label: "Expired", color: "red" },
    [LemonSqueezySubscriptionStatus.on_trial]: { label: "Incomplete", color: "yellow" },
    [LemonSqueezySubscriptionStatus.paused]: { label: "Incomplete Expired", color: "red" },
    [LemonSqueezySubscriptionStatus.past_due]: { label: "Past Due", color: "red" },
    [LemonSqueezySubscriptionStatus.unpaid]: { label: "Trialing", color: "yellow" },
  }

  const status = statusMap[subscription.status]
  const formattedDate = formatDate(subscription.createdAt)
  const {
    product_name,
    variant_name,

    urls: { customer_portal },
  } = subscription.attributes
  let price = subscription.variant?.price / 100
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)

  if (!status) {
    throw new Error(`Unknown status: ${subscription.status}`)
  }

  return (
    <Card padding="lg" radius="md" withBorder style={{ maxWidth: "350px" }}>
      <Stack>
        <Badge color={status.color} variant="light">
          {status.label}
        </Badge>
        <Text>
          <span style={{ fontWeight: "500" }}>Your plan:</span> {product_name} @ {formattedPrice} -{" "}
          {variant_name}
        </Text>

        <Text>
          <span style={{ fontWeight: "500" }}>Purchased on:</span> {formattedDate}
        </Text>
        <Button
          style={{ width: "60%" }}
          size="sm"
          variant="light"
          onClick={() => openUrlInNewTab(customer_portal)}
        >
          Manage subscription
        </Button>
      </Stack>
    </Card>
  )
}

// Component to display a list of subscriptions
const SubscriptionList = ({ subscriptions }) => {
  // Sort subscriptions by createdAt in descending order
  const sortedSubscriptions = subscriptions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <Stack gap="lg">
      <Title order={2} fw={700}>
        My Subscriptions
      </Title>
      {subscriptions.length === 0 ? (
        <Text>You have {subscriptions.length} active subscriptions</Text>
      ) : null}
      {sortedSubscriptions.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </Stack>
  )
}

export const UserBillingSettings: React.FC<{}> = ({}) => {
  const [subscriptions] = useQuery(getSubscriptions, {})

  return (
    <Stack>
      <SubscriptionList subscriptions={subscriptions} />
    </Stack>
  )
}
