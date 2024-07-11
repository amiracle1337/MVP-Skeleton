import Head from "next/head"
import React from "react"
import { Routes } from "@blitzjs/next"
import { Suspense } from "react"
import { Group, Flex, Text, Anchor, Modal, Badge } from "@mantine/core"
import { AppShell } from "@mantine/core"
import Link from "next/link"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { RootErrorFallback } from "src/core/components/RootErrorFallback"
import { ErrorBoundary } from "@blitzjs/next"
import { FullPageLoader } from "../components/FullPageLoader"
import { UserProfileProgress } from "../components/Header/UserProfileProgress"
import { OnboardingWizard } from "../components/OnboardingWizard"
import { openContextModal } from "@mantine/modals"
import { GlobalModals } from "src/modals"
import { UserHeaderMenu } from "../components/Header/UserHeaderMenu"
import { ImpersonatingUserNotice } from "src/features/admin/components/ImpersonationHeader"
import { IconSearch } from "@tabler/icons-react"
import { spotlight } from "@mantine/spotlight"
import { useMediaQueries } from "src/styles/responsive/MediaQueryContext"
import { isThisYear } from "date-fns"

const Layout: React.FC<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
  // const thisYear = new Date().getFullYear()
  const user = useCurrentUser()
  const { isMobile } = useMediaQueries()

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
            border: "none",
          }}
        >
          <Anchor
            style={{ textDecoration: "none" }}
            c="black"
            component={Link}
            href={Routes.Home()}
            fw={700}
          >
            artifo
          </Anchor>
          <ImpersonatingUserNotice />
          {user && (
            <Group>
              <IconSearch
                color="grey"
                size={15}
                onClick={spotlight.open}
                style={{ cursor: "pointer" }}
              />
              <UserHeaderMenu />
              <Group>
                {/* if user is on mobile, dont show username */}
                {!isMobile && <Text c="gray.7">{user.username}</Text>}
                <UserProfileProgress />
              </Group>
              {!user.username && (
                <Link href={Routes.EditProfilePage()}>
                  <Text c="gray.7">{user.name}</Text>{" "}
                </Link>
              )}

              <Badge
                color="red"
                onClick={() => {
                  openContextModal({
                    title: "Become pro",
                    modal: GlobalModals.becomePro,
                    innerProps: { price: 9 },
                  })
                }}
              >
                Pro
              </Badge>
            </Group>
          )}
        </AppShell.Header>

        <AppShell.Main>
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense fallback={<FullPageLoader />}>
              <Group>
                {children}
                {user?.username && (
                  <Modal
                    size="xl"
                    closeOnClickOutside={false}
                    closeOnEscape={false}
                    withCloseButton={false}
                    title="Onboarding modal"
                    opened={!user?.onboarded}
                    onClose={() => {}}
                  >
                    <OnboardingWizard />
                  </Modal>
                )}
              </Group>
            </Suspense>
          </ErrorBoundary>
        </AppShell.Main>

        {!isMobile && (
          <AppShell.Footer p="md">
            <Flex justify={"center"} align={"center"}>
              <Text c="dimmed" fz="xs">
                copywright {isThisYear(new Date()) ? new Date().getFullYear() : ""} artifo
              </Text>
            </Flex>
          </AppShell.Footer>
        )}
      </AppShell>
    </>
  )
}

export default Layout
