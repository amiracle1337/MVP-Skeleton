import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { Tabs, rem } from "@mantine/core"
import {
  IconSettings,
  IconUserCog,
  IconMail,
  IconMoneybag,
  IconUser,
  IconMoodPlus,
} from "@tabler/icons-react"
import { AdminPageEmailTab } from "./components/AdminPageEmailTab"
import { AdminPageBillingTab } from "./components/AdminPageBillingTab"
import { AdminPageUserTab } from "./components/AdminPageUserTab"
import { AdminPageInviteTab } from "./components/AdminPageInviteTab"

export const AdminSettingsPage: BlitzPage = () => {
  const iconStyle = { width: rem(14), height: rem(14) }
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
            <Tabs.Tab value="users" leftSection={<IconUser style={iconStyle} />}>
              Users
            </Tabs.Tab>
            <Tabs.Tab value="invite" leftSection={<IconMoodPlus style={iconStyle} />}>
              Invite
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel style={{ marginLeft: "20px" }} value="email">
            <AdminPageEmailTab />
          </Tabs.Panel>
          <Tabs.Panel style={{ marginLeft: "20px" }} value="billing">
            <AdminPageBillingTab />
          </Tabs.Panel>
          <Tabs.Panel style={{ marginLeft: "20px" }} value="invite">
            <AdminPageInviteTab />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default AdminSettingsPage
