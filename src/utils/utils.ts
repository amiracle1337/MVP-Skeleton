import { useParam } from "@blitzjs/next"

export const useStringParam = (name) => useParam(name, "string")
