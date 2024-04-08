import { Tooltip, RingProgress } from "@mantine/core"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"

import Link from "next/link"

import { Routes } from "@blitzjs/next"

export const UserProfileProgress = () => {
  const user = useCurrentUser()
  if (!user) return null
  const keys = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "bio",
      label: "Bio",
    },
    {
      key: "avatarImageKey",
      label: "Profile picture",
    },
    {
      key: "bio",
      label: "Bio",
    },
  ]

  const existingKeys = keys.filter((key) => user[key.key])
  const completitionPercentage = (existingKeys.length / keys.length) * 100

  if (completitionPercentage === 100) return null

  return (
    <Link href={Routes.editProfilePage()}>
      <Tooltip label={`Profile progress (${completitionPercentage}%)`}>
        <RingProgress
          size={25}
          thickness={3}
          roundCaps
          sections={[{ value: completitionPercentage, color: "red" }]}
        />
      </Tooltip>
    </Link>
  )
}
