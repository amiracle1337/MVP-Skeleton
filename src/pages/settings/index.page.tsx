import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { Tabs, rem } from "@mantine/core"
import { IconSettings, IconUserCog, IconMail, IconCreditCard } from "@tabler/icons-react"
import { ChangePassword } from "./components/ChangePassword"
import { UserEmailSettings } from "./components/UserEmailSettings"
import { UserBillingSettings } from "./components/UserBillingSettings"

export const SettingsPage: BlitzPage = () => {
  const iconStyle = { width: rem(12), height: rem(12) }
  return (
    <Layout>
      <Stack w={"100%"}>
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
            <Tabs.Tab value="billing" leftSection={<IconCreditCard style={iconStyle} />}>
              Billing
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel style={{ marginLeft: "20px" }} value="account">
            <ChangePassword />
          </Tabs.Panel>
          <Tabs.Panel style={{ marginLeft: "20px" }} value="email">
            <UserEmailSettings />
          </Tabs.Panel>
          <Tabs.Panel style={{ marginLeft: "20px" }} value="billing">
            <UserBillingSettings />
          </Tabs.Panel>

          <Tabs.Panel style={{ marginLeft: "20px" }} value="settings">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default SettingsPage
