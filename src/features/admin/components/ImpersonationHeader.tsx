import { invoke } from "@blitzjs/rpc"
import stopImpersonatingUser from "../mutations/stopImpersonatingUser"
import { useSession } from "@blitzjs/auth"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"
import { useRouter } from "next/router"

export const ImpersonatingUserNotice = () => {
  const session = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()

  if (!session.impersonatingFromUserId) return null

  return (
    <Button
      size="xs"
      variant="light"
      color="yellow"
      leftSection={<IconAlertTriangle size={16} />}
      onClick={async () => {
        await invoke(stopImpersonatingUser, {})
        await router.push("/")
        queryClient.clear() // Invalidate all queries to refresh the data
        window.location.reload()
      }}
    >
      Stop impersonation
    </Button>
  )
}
