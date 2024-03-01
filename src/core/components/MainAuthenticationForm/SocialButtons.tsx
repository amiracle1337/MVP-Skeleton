import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { Group } from "@mantine/core"
import { GoogleButton } from "./Icons/GoogleIcon"
import { FacebookButton } from "./Icons/FacebookIcon"

export const SocialButtons: BlitzPage = () => {
  return (
    <Group grow mb="md" mt="md">
      <GoogleButton radius="xl">Google</GoogleButton>
      <FacebookButton radius="xl">Facebook</FacebookButton>
    </Group>
  )
}

export default SocialButtons
