import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import { useStringQueryParam } from "src/utils/utils"
import React from "react"
import getUserEmailSettingsForUnsubscribe from "src/features/users/queries/getUserEmailSettingsForUnsubscribe"
import { Checkbox, Text, Stack } from "@mantine/core"
import { useMutation, useQuery } from "@blitzjs/rpc"
import setUserEmailSetting from "src/features/users/mutations/setUserEmailSetting"

export const ToggleUserEmailSetting = ({ settings, label, setting, token }) => {
  const [$updateSettings, { isLoading }] = useMutation(setUserEmailSetting, {})

  return (
    <Checkbox
      disabled={isLoading}
      onClick={() => {
        $updateSettings({
          key: setting,
          value: !settings?.[setting],
          token,
        }).catch((error) => {
          console.error("An error occurred:", error)
        })
      }}
      checked={settings?.[setting]}
      label={label}
    ></Checkbox>
  )
}

export const UnsubscribePage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [settings] = useQuery(getUserEmailSettingsForUnsubscribe, {
    token: token as string,
  })

  return (
    <Layout>
      <Stack>
        <Text>Email settings</Text>
      </Stack>

      <Stack>
        <ToggleUserEmailSetting
          token={token}
          settings={settings}
          setting="settingsEmailMarketing"
          label="Product updates"
        />
        <ToggleUserEmailSetting
          token={token}
          settings={settings}
          setting="settingsEmailMarketingProduct"
          label="Marketing updates"
        />
      </Stack>
    </Layout>
  )
}

export default UnsubscribePage
