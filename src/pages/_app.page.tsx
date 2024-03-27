import { ErrorBoundary, AppProps } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { RootErrorFallback } from "src/core/components/RootErrorFallback"
import "src/styles/globals.css"
import { Suspense } from "react"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import { FullPageLoader } from "src/core/components/FullPageLoader"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme={"dark"} withCssVariables={true}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications />
        <Suspense fallback={<FullPageLoader />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
