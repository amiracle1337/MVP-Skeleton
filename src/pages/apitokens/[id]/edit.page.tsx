import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { useStringParam } from "src/utils/utils"
import { Suspense, useState, useEffect } from "react"
import updateApiToken from "src/features/api-tokens/mutations/updateApiToken"
import { ApiTokenPermission } from "@prisma/client"
import { Button, Checkbox, Stack, Title } from "@mantine/core"
import getApiToken from "src/features/api-tokens/queries/getApiToken"
import Layout from "src/core/layouts/Layout"
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

export const EditApiToken = () => {
  const id = useStringParam("id")
  const router = useRouter()

  const [apitoken] = useQuery(getApiToken, { id: id as string })
  console.log("12", apitoken)
  const [updateApiTokenMutation] = useMutation(updateApiToken)
  const [selectedPermissions, setSelectedPermissions] = useState<ApiTokenPermission[]>([])

  useEffect(() => {
    if (apitoken && apitoken.permission) {
      setSelectedPermissions(apitoken.permission)
    }
  }, [apitoken])

  const onPermissionChange = (permission: ApiTokenPermission) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission]
    )
  }

  const onSubmit = async () => {
    try {
      const result = await updateApiTokenMutation({
        id: id as string,
        name: apitoken?.name as string,
        permission: selectedPermissions,
      })
      await router.push(
        Routes.SettingsPage({
          tab: "tokens",
        })
      )
    } catch (error) {}
  }

  // const onSubmit = async () => {
  //   await updateApiTokenMutation({
  //     id: id as string,
  //     name: apitoken?.name as string, // Ensure name is included
  //     permission: selectedPermissions, // Ensure permissions are included
  //   })
  //   await router.push(
  //     Routes.SettingsPage({
  //       tab: "tokens",
  //     })
  //   )
  // }

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Stack>
          <Title order={3}>Edit API Token Permissions</Title>
          {permissions.map((permission) => (
            <Checkbox
              key={permission.value}
              label={permission.label}
              checked={selectedPermissions.includes(permission.value)}
              onChange={() => onPermissionChange(permission.value)}
            />
          ))}
          <Button onClick={onSubmit}>Update API Token</Button>
        </Stack>
      </Suspense>
    </Layout>
  )
}

const EditApiTokenPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditApiToken />
      </Suspense>
    </div>
  )
}

export default EditApiTokenPage
