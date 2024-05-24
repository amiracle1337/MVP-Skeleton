import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { Tabs, rem } from "@mantine/core"
import { IconSettings, IconUserCog, IconMail, IconMoneybag } from "@tabler/icons-react"
import { AdminPageEmailTab } from "./components/AdminPageEmailTab"
import { AdminPageBillingTab } from "./components/AdminPageBillingTab"

export const AdminSettingsPage: BlitzPage = () => {
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
            <Tabs.Tab value="email" leftSection={<IconUserCog style={iconStyle} />}>
              Email
            </Tabs.Tab>
            <Tabs.Tab value="billing" leftSection={<IconMoneybag style={iconStyle} />}>
              Billing
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel style={{ marginLeft: "20px" }} value="email">
            <AdminPageEmailTab />
          </Tabs.Panel>
          <Tabs.Panel style={{ marginLeft: "20px" }} value="billing">
            <AdminPageBillingTab />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default AdminSettingsPage
