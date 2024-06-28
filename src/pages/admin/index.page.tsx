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

import { useStringQueryParam } from "src/utils/utils"
import { adminSettingsTab } from "src/core/spotlight/actions"

export const AdminSettingsPage: BlitzPage = () => {
  const iconStyle = { width: rem(14), height: rem(14) }
  const tabsFromUrl = useStringQueryParam("tab")

  return (
    <Layout>
      <Stack w={"100%"}>
        <Tabs
          // make sure to set keepMounted to false to avoid rendering all tabs at once
          keepMounted={false}
          color="rgba(0, 0, 0, 1)"
          variant="pills"
          radius="sm"
          orientation="vertical"
          // value={tabsFromUrl || ("users" as any)}
        >
          <Tabs.List>
            {adminSettingsTab.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value} leftSection={<tab.icon size="1rem" />}>
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {adminSettingsTab.map((tab) => (
            <Tabs.Panel key={tab.value} style={{ marginLeft: "20px" }} value={tab.value}>
              <tab.content />
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default AdminSettingsPage
