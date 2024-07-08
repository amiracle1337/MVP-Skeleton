import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { Suspense, useState } from "react"
import createApiToken from "src/features/api-tokens/mutations/createApiToken"
import { BlitzPage } from "@blitzjs/auth"
import { ApiTokenPermission } from "@prisma/client"
import { Button, Checkbox, Group, Input, Stack, Title } from "@mantine/core"
import { Routes } from "@blitzjs/next"

const permissions = [
  {
    value: ApiTokenPermission.ReadAction,
    label: "Read",
  },
  {
    value: ApiTokenPermission.CreateAction,
    label: "Create",
  },
  {
    value: ApiTokenPermission.UpdateAction,
    label: "Update",
  },
  {
    value: ApiTokenPermission.DeleteAction,
    label: "Delete",
  },
]

export const NewApiTokenPage: BlitzPage = () => {
  const [$createApiToken, { isLoading }] = useMutation(createApiToken)
  const router = useRouter()
  const [selectedPermissions, setSelectedPermissions] = useState([] as ApiTokenPermission[])
  const [tokenName, setTokenName] = useState("new API token")

  const onSubmit = async () => {
    await $createApiToken({
      name: tokenName,
      permission: selectedPermissions,
    })
    await router.push(
      Routes.SettingsPage({
        tab: "tokens",
      })
    ) // Redirect to UserTokenSettings page
  }

  const onPermissionChange = (permission: ApiTokenPermission) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission]
    )
  }

  return (
    <Layout title="Create New API token">
      <Stack>
        <Title order={3}>Create New API Token</Title>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Input
          placeholder="Name"
          value={tokenName}
          onChange={(event) => setTokenName(event.currentTarget.value)}
        />
        {permissions.map((permission) => {
          return (
            <Checkbox
              key={permission.value}
              label={permission.label}
              checked={selectedPermissions.includes(permission.value)}
              onChange={() => onPermissionChange(permission.value)}
            />
          )
        })}
        <Button loading={isLoading} onClick={onSubmit}>
          Create API Token
        </Button>
      </Stack>
    </Layout>
  )
}

NewApiTokenPage.authenticate = true

export default NewApiTokenPage
