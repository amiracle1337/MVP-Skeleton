import { Checkbox, Stack } from "@mantine/core"
import getUserEmailSettings from "src/features/users/queries/getUserEmailSettings"
import { useMutation, useQuery } from "@blitzjs/rpc"
import setEmailSettings from "src/features/users/mutations/setEmailSettings"
import { ToggleUserEmailSetting } from "src/core/components/ToggleUserEmailSetting"

export const UserEmailSettings = () => {
  const [settings] = useQuery(getUserEmailSettings, {})
  return (
    <Stack>
      <ToggleUserEmailSetting
        settings={settings}
        setting="settingsEmailMarketing"
        label="Product updates"
      />
      <ToggleUserEmailSetting
        settings={settings}
        setting="settingsEmailMarketingProduct"
        label="Marketing updates"
      />
    </Stack>
  )
}
