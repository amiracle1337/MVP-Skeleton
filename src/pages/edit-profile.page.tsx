import { useMutation, useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import { useForm, zodResolver } from "@mantine/form"
import updateProfile from "src/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "src/features/users/schemas"
import { EditProfileForm } from "src/features/users/forms/EditProfileForm"
import { notifications } from "@mantine/notifications"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import getUserForEditingProfile from "src/features/users/queries/getUserForEditingProfile"

export const EditProfilePage: BlitzPage = () => {
  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {})
  const [profileData] = useQuery(getUserForEditingProfile, {})
  const router = useRouter()

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: profileData?.name || "",
      username: profileData?.username || "",
      bio: profileData?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  const username = useStringParam("username")
  return (
    <Layout>
      <Stack>
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            if (username) {
              await router.push(Routes.ProfilePage({ username }))
            }
            notifications.show({
              color: "green",
              title: "Success!",
              message: "Profile updated!",
            })
            close()
          }}
          isSubmitting={isLoading}
        />
      </Stack>
    </Layout>
  )
}

export default EditProfilePage
