import { useMutation } from "@blitzjs/rpc"
import { Modal } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import updateProfile from "src/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "src/features/users/schemas"
import { useRouter } from "next/router"
import { EditProfileForm } from "src/features/users/forms/EditProfileForm"
import { notifications } from "@mantine/notifications"
import { Routes } from "@blitzjs/next"

const EditProfilePageModalInside = ({ user, close }) => {
  const router = useRouter()
  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {})

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      avatarImageKey: user?.avatarImageKey || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  return (
    <EditProfileForm
      form={form}
      onSubmit={async (values) => {
        await $updateProfile(values)
        const { username } = values
        if (username !== user.username && username) {
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
  )
}

export const EditProfilePageModal = ({ user, opened, close }) => {
  return (
    <Modal keepMounted={false} opened={opened} onClose={close} title="Edit Profile">
      {user && <EditProfilePageModalInside user={user} close={close} />}
    </Modal>
  )
}
