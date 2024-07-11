import { createContext, useContext } from "react"

export const MediaQueryContext = createContext<{
  isMobile: boolean
  isTablet: boolean
  isLarge: boolean
}>({
  isMobile: false,
  isTablet: false,
  isLarge: false,
})

export const useMediaQueries = () => {
  return useContext(MediaQueryContext)
}
