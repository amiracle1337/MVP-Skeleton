import { Routes } from "@blitzjs/next"
import { rem, Button } from "@mantine/core"
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight"
import { IconHome, IconDashboard, IconFileText, IconSearch } from "@tabler/icons-react"
import { useRouter } from "next/router"

export function SpotlightWrapper(isOpen, onClose) {
  const router = useRouter()

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
    {
      id: "documentation",
      label: "Documentation",
      description: "Visit documentation to lean more about all features",
      onClick: () => router.push("/documentation"), // Example path for documentation
      leftSection: <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
  ]

  return (
    <>
      <Button color="red" onClick={spotlight.open}>
        Open spotlight
      </Button>
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
