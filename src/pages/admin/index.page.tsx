import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { Tabs, rem } from "@mantine/core"
import { IconSettings, IconUserCog, IconMail } from "@tabler/icons-react"

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
          </Tabs.List>

          <Tabs.Panel style={{ marginLeft: "20px" }} value="email">
            Sending bulk email
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default AdminSettingsPage
