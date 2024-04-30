import React from "react"
import { Group } from "@mantine/core"
import { GoogleButton } from "./Icons/GoogleIcon"
import { FacebookButton } from "./Icons/FacebookIcon"

export const SocialButtonsAuth = () => {
  return (
    <Group grow mb="md" mt="md">
      <GoogleButton radius="xl">Google</GoogleButton>
      <FacebookButton radius="xl">Facebook</FacebookButton>
    </Group>
  )
}
