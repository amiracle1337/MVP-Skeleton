import { Checkbox, Stack } from "@mantine/core"
import getUserEmailSettings from "src/features/users/queries/getUserEmailSettings"
import { useMutation, useQuery } from "@blitzjs/rpc"
import setEmailSettings from "src/features/users/mutations/setEmailSettings"

export const ToggleUserEmailSetting = ({ settings, label, setting }) => {
  const [$updateSettings, { isLoading }] = useMutation(setEmailSettings, {})

  return (
    <Checkbox
      disabled={isLoading}
      onClick={async () => {
        await $updateSettings({
          key: setting,
          value: !settings?.[setting],
        })
      }}
      checked={settings?.[setting]}
      label={label}
    ></Checkbox>
  )
}
