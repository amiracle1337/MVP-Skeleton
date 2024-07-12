import { Routes } from "@blitzjs/next"
import { rem, Button } from "@mantine/core"
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight"
import { IconHome, IconDashboard, IconFileText, IconSearch, IconUser } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { adminSettingsTab, settingsTab } from "src/core/spotlight/actions"

export function SpotlightWrapper() {
  const router = useRouter()
  const user = useCurrentUser({ suspense: false })

  const actions: SpotlightActionData[] = [
    {
      id: "home",
      label: "Home",
      description: "Get to home page",
      onClick: () => router.push(Routes.Home()), // Navigate to home page
      leftSection: <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Get full information about current system status",
      onClick: () => router.push("/dashboard"), // Example path for dashboard
      leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    ...(user && user.isAdmin
      ? adminSettingsTab.map((tab) => ({
          id: tab.value,
          label: `Admin settings → ${tab.label}`,
          description: `Go to ${tab.label} settings`,
          onClick: () => router.push(Routes.AdminSettingsPage({ tab: tab.value })), // Example path for admin settings
          leftSection: <tab.icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
        }))
      : []),
    ...(user
      ? [
          ...settingsTab.map((tab) => ({
            id: tab.value,
            label: `Settings → ${tab.label}`,
            description: `Go to ${tab.label} settings`,
            onClick: () => router.push(Routes.SettingsPage({ tab: tab.value })), // Example path for settings
            leftSection: <tab.icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
          })),
          {
            id: "edit-profile",
            label: "Edit profile",
            description: "Edit your profile",
            onClick: () => router.push(Routes.EditProfilePage()), // Example path for edit profile
            leftSection: <IconUser style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
          },
        ]
      : []),
  ]

  return (
    <>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
          placeholder: "Search...",
        }}
      />
    </>
  )
}
