import { ErrorBoundary, AppProps } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { RootErrorFallback } from "src/core/components/RootErrorFallback"
import "src/styles/globals.css"
import { Suspense } from "react"
import { Loader, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme={"light"} withCssVariables={true}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications />
        <Suspense fallback={<Loader />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
