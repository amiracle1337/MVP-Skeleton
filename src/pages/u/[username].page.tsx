import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { Text, Stack, Button, Modal, Alert } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { useForm, Form, zodResolver } from "@mantine/form"
import updateProfile from "src/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "src/features/users/schemas"
import { useRouter } from "next/router"
import { EditProfileForm } from "src/features/users/forms/EditProfileForm"
import { notifications } from "@mantine/notifications"
import { Routes } from "@blitzjs/next"
import { IconInfoCircle } from "@tabler/icons-react"
import requestEmailVerification from "src/features/auth/mutations/requestVerificationEmail"

export const ProfilePage: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const username = useStringParam("username")
  const [user] = useQuery(getUserForProfile, { username: username || "" }, { enabled: !!username })
  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {})
  const [$requestEmailVerification, { isLoading: isSendingEmail, isSuccess }] = useMutation(
    requestEmailVerification,
    {}
  )
  const router = useRouter()
  const icon = <IconInfoCircle />

  const [opened, { open, close }] = useDisclosure(false)

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
  if (!user) return <Text>User not found :(</Text>
  const isOwner = currentUser?.id === user.id

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close(), form.reset()
        }}
        title="edit profile"
      >
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            const { username } = values
            if (username !== user.username) {
              if (username) {
                await router.push(Routes.ProfilePage({ username }))
              }
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
      </Modal>

      <Button>Open modal</Button>
      <Layout>
        <Stack>
          {isOwner && !currentUser.emailVerifiedAt && (
            <Stack>
              <Alert
                variant="light"
                color="red"
                radius="md"
                title={isSuccess ? "Email sent!" : "Warning!"}
                icon={icon}
              >
                {!isSuccess && (
                  <>
                    <Text style={{ marginBottom: "15px" }}>
                      Your email is not verified. Please check your inbox for the verification
                      email.
                    </Text>
                    <Button
                      loading={isSendingEmail}
                      size="xs"
                      gradient={{ from: "red", to: "red", deg: 340 }}
                      variant="gradient"
                      onClick={async () => {
                        try {
                          await $requestEmailVerification()
                          notifications.show({
                            color: "green",
                            title: "Email sent!",
                            message: "Please check your inbox for the verification email.",
                          })
                        } catch (error) {
                          console.error("Failed to send verification email:", error)
                          notifications.show({
                            color: "red",
                            title: "Error!",
                            message: "Failed to send verification email. Please try again.",
                          })
                        }
                      }}
                    >
                      Resend my verification email
                    </Button>
                  </>
                )}
                {isSuccess && (
                  <Text>
                    The email has been sent to you and should arrive shortly. Please check your
                    spam.{" "}
                  </Text>
                )}
              </Alert>
            </Stack>
          )}
          {isOwner && <Button onClick={open}>Edit your profile</Button>}
          <Text>hello {user.name}</Text>
          <Text>{user.bio}</Text>
        </Stack>
      </Layout>
    </>
  )
}

export default ProfilePage
