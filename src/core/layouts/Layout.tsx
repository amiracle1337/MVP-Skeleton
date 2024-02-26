import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Suspense } from "react"
import { Group, Flex, Text, Center } from "@mantine/core"
import { AppShell } from "@mantine/core"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const thisYear = new Date().getFullYear()

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
          style={{ height: 45, display: "flex", alignItems: "center", justifyContent: "left" }}
        >
          <div>Eventio</div>
        </AppShell.Header>

        <AppShell.Main>
          <Suspense fallback="Loading...">
            <Group> {children}</Group>
          </Suspense>
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
