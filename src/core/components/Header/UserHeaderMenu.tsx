import {
  IconLogout,
  IconPencil,
  IconTool,
  IconUser,
  IconUserShield,
  IconSettings,
} from "@tabler/icons-react"
import { Box, Menu, Indicator, Tooltip } from "@mantine/core"
import { UserAvatar } from "../UserAvatar"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { MenuItemIcon, MenuItemLink } from "../MenuItems"
import { Routes } from "@blitzjs/next"
import logout from "src/features/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"

export const UserHeaderMenu = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  // Handling the logout process properly
  const handleLogout = async () => {
    try {
      await logoutMutation()
      await router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
      // Optionally handle the error, e.g., show a notification
    }
  }

  // if (!user || !user.username) return null
  if (!user) return null

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box style={{ cursor: "pointer" }}>
          {user.isAdmin ? (
            <Indicator
              color="none"
              label={
                <Tooltip label="admin">
                  <IconUserShield color="black" size={12} />
                </Tooltip>
              }
              size={16}
              position="bottom-end"
            >
              <UserAvatar user={user} size="33px" />
            </Indicator>
          ) : (
            <UserAvatar user={user} size="35px" />
          )}
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        {user.isAdmin && (
          <MenuItemLink Icon={IconUserShield} href={Routes.AdminSettingsPage()}>
            Admin
          </MenuItemLink>
        )}
        <MenuItemLink Icon={IconSettings} href={Routes.SettingsPage()}>
          Settings
        </MenuItemLink>
        <MenuItemLink Icon={IconUser} href={Routes.EditProfilePage()}>
          Go to profile
        </MenuItemLink>
        {/* <MenuItemLink Icon={IconUser} href={Routes.ProfilePage({ username: user.username })}>
          Go to profile
        </MenuItemLink> */}
        <Menu.Divider />
        <MenuItemIcon color="red.5" Icon={IconLogout} onClick={handleLogout}>
          Logout
        </MenuItemIcon>
      </Menu.Dropdown>
    </Menu>
  )
}
