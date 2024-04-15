import { BlitzPage } from "@blitzjs/auth"
import { Text, Stack } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { Tabs, rem } from "@mantine/core"
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconUserCog,
  IconMail,
} from "@tabler/icons-react"

export const settingsPage: BlitzPage = () => {
  const iconStyle = { width: rem(12), height: rem(12) }
  return (
    <Layout>
      <Stack>
        <Tabs
          color="rgba(0, 0, 0, 1)"
          variant="pills"
          radius="sm"
          orientation="vertical"
          defaultValue="account"
        >
          <Tabs.List>
            <Tabs.Tab value="account" leftSection={<IconUserCog style={iconStyle} />}>
              Account
            </Tabs.Tab>
            <Tabs.Tab value="email" leftSection={<IconMail style={iconStyle} />}>
              Email
            </Tabs.Tab>

            <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel style={{ marginLeft: "10px" }} value="account">
            Account{" "}
          </Tabs.Panel>
          <Tabs.Panel style={{ marginLeft: "10px" }} value="email">
            Email
          </Tabs.Panel>

          <Tabs.Panel style={{ marginLeft: "10px" }} value="settings">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default settingsPage
