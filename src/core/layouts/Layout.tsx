import Head from "next/head"
import React, { useState } from "react"
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

const Layout: React.FC<{
  title?: string
  children?: React.ReactNode
}> = ({ title, children }) => {
  const thisYear = new Date().getFullYear()
  const user = useCurrentUser()

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
            c="black"
            component={Link}
            href={Routes.Home()}
            fw={700}
          >
            future project
          </Anchor>
          {user && (
            <Group>
              <UserHeaderMenu />
              <Group>
                <Text c="gray.7">{user.username}</Text>
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
                    title: "Modal title",
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
