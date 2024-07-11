import { ErrorBoundary, AppProps } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { RootErrorFallback } from "src/core/components/RootErrorFallback"
import "src/styles/globals.css"
import { Suspense } from "react"
import { createTheme, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import { FullPageLoader } from "src/core/components/FullPageLoader"
import "@uploadthing/react/styles.css"
import { ModalsProvider } from "@mantine/modals"
import { globalModals } from "src/modals"
import { themeMantine } from "src/styles/mantine-theme"
import { SpotlightWrapper } from "src/core/spotlight"
import { MediaQueriesProvider } from "src/styles/responsive/mediaQueries"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={themeMantine} defaultColorScheme={"light"} withCssVariables={true}>
      <MediaQueriesProvider>
        <ModalsProvider modals={globalModals}>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            <Notifications />
            <Suspense fallback={<FullPageLoader />}>
              <SpotlightWrapper />
              <Component {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        </ModalsProvider>
      </MediaQueriesProvider>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
