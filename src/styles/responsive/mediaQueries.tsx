import React, { ReactNode } from "react"
import { useMediaQuery } from "@mantine/hooks"
import { MediaQueryContext } from "./MediaQueryContext"

interface MediaQueriesProviderProps {
  children: ReactNode
}

export const MediaQueriesProvider: React.FC<MediaQueriesProviderProps> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 30em)") ?? false
  const isTablet = useMediaQuery("(min-width: 30em) and (max-width: 60em)") ?? false
  const isLarge = useMediaQuery("(min-width: 60em)") ?? false

  return (
    <MediaQueryContext.Provider value={{ isMobile, isTablet, isLarge }}>
      {children}
    </MediaQueryContext.Provider>
  )
}
