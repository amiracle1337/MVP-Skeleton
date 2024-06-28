import { BlitzPage } from "@blitzjs/auth"
import { Stack, Tabs, rem } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { settingsTab } from "src/core/spotlight/actions"
import { useStringQueryParam } from "src/utils/utils"

export const SettingsPage: BlitzPage = () => {
  const tabsFromUrl = useStringQueryParam("tab")

  return (
    <Layout>
      <Stack w={"100%"}>
        <Tabs
          keepMounted={false}
          color="rgba(0, 0, 0, 1)"
          variant="pills"
          radius="sm"
          orientation="vertical"
          // value={tabsFromUrl || ("account" as any)}
        >
          <Tabs.List>
            {settingsTab.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value} leftSection={<tab.icon size="1rem" />}>
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {settingsTab.map((tab) => (
            <Tabs.Panel key={tab.value} style={{ marginLeft: "20px" }} value={tab.value}>
              <tab.content />
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
    </Layout>
  )
}

export default SettingsPage
