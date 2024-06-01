import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/features/users/queries/getCurrentUser"
import { boolean } from "zod"

type Props = {
  suspense?: boolean
}

let defaultOptions: Props = {
  suspense: false,
}

export const useCurrentUser = ({ suspense }: Props = defaultOptions) => {
  const [user] = useQuery(getCurrentUser, null, { suspense })
  if (!user) return null

  return {
    ...user,
    isAdmin: user?.role === "ADMIN",
  }
}
