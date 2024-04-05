import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"

export const useStringParam = (name) => {
  let param = useParam(name, "string")
  return param
}

export const useStringQueryParan = (name) => {
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
