import { IconUser, IconUserShield } from "@tabler/icons-react"
import { Box, Menu, Text, rem } from "@mantine/core"
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react"
import { Indicator } from "@mantine/core"
import { Tooltip } from "@mantine/core"
import { UserAvatar } from "../UserAvatar"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"

export const UserHeaderMenu = () => {
  const user = useCurrentUser()

  if (!user) return null

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box style={{ cursor: "pointer" }}>
          {user.isAdmin ? (
            <Indicator
              color="none"
              label={
                <>
                  <Tooltip label="admin">
                    <IconUserShield color="black" size={12} />
                  </Tooltip>
                </>
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
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Edit profile
        </Menu.Item>
        <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
          Go to profile
        </Menu.Item>
        {/* <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item> */}
        {/* <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
          Gallery
        </Menu.Item> */}
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}