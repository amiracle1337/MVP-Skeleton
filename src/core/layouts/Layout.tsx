import Head from "next/head"
import React from "react"
import { Routes } from "@blitzjs/next"
import { Suspense } from "react"
import { Group, Flex, Text, Tooltip, Anchor, Button, Loader } from "@mantine/core"
import { AppShell } from "@mantine/core"
import Link from "next/link"
import logout from "src/features/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { IconUserShield } from "@tabler/icons-react"
import { RootErrorFallback } from "src/core/components/RootErrorFallback"
import { ErrorBoundary } from "@blitzjs/next"
import { useRouter } from "next/router"
import { FullPageLoader } from "../components/FullPageLoader"

const Layout: React.FC<{
  title?: string
  children?: React.ReactNode
}> = ({ title, children }) => {
  const thisYear = new Date().getFullYear()
  const [logoutMutation] = useMutation(logout)
  const user = useCurrentUser()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title || "evApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 10,
          breakpoint: "sm",
        }}
        padding="md"
      >
        <AppShell.Header
          p={"10px"}
          style={{
            height: 55,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Anchor
            style={{ textDecoration: "none" }}
            c="gray.7"
            component={Link}
            href={Routes.Home()}
          >
            Nova
          </Anchor>
          {user && (
            <Group>
              <Text c="gray.7">{user.name}</Text>
              {user.isAdmin && (
                <Tooltip label="Admin">
                  <IconUserShield size={14} />
                </Tooltip>
              )}
              <Button
                size="xs"
                variant="light"
                onClick={async () => {
                  await logoutMutation()
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </Group>
          )}
        </AppShell.Header>

        <AppShell.Main>
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense fallback={<FullPageLoader />}>
              <Group> {children}</Group>
            </Suspense>
          </ErrorBoundary>
        </AppShell.Main>

        <AppShell.Footer p="md">
          <Flex justify={"center"} align={"center"}>
            <Text c="dimmed" fz="xs">
              copywright {thisYear}
            </Text>
          </Flex>
        </AppShell.Footer>
      </AppShell>
      );
    </>
  )
}

export default Layout
