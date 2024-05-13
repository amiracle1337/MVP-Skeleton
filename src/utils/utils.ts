import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"

export const useStringParam = (name) => {
  let param = useParam(name, "string")
  return param
}

export const useStringQueryParam = (name) => {
  let { query } = useRouter()
  return query[name]
}

export const getUploadthingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://uploadthing.com/f/${fileKey}` : ""
}

export const getAvatarFallbackName = (name?: string | null) => {
  if (!name) return ""
  const [first, second] = name.split(" ")
  return `${first ? first[0] : ""}${second ? second[0] : ""}`
}

type arrayItem = {
  key: string
  value: string
}

export const convertArrayToObject = (array: arrayItem[]) => {
  return array.reduce((obj, item) => {
    obj[item.key] = item.value
    return obj
  }, {})
}

export const isIOS =
  typeof window !== "undefined" &&
  window.navigator &&
  (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
    (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1))

export const isSafari =
  typeof window !== "undefined" &&
  window.navigator &&
  /Version\/[\d\.]+.*Safari/.test(window.navigator.userAgent)

export let openUrlInNewTab = async (url: string) => {
  if (url) {
    if (isIOS || isSafari) {
      window.location.assign(url)
    } else {
      window.open(url, "_blank")
    }
  }
}
