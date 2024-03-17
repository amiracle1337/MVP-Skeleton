import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { Text, Stack, Button, Modal, TextInput, Textarea, Flex, Box } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { useForm, Form, zodResolver } from "@mantine/form"
import updateProfile from "src/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "src/features/users/schemas"
import { showNotification } from "@mantine/notifications"

export const ProfilePage: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const username = useStringParam("username")
  const [user] = useQuery(getUserForProfile, { username: username || "" }, { enabled: !!username })
  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {})

  if (!user) return <Text>User not found :(</Text>

  const isOwner = currentUser?.id === user.id
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm<UpdateProfileInputType>({
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  return (
    <>
      <Modal opened={opened} onClose={close} title="edit profile">
        <Form
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            showNotification({
              color: "green",
              title: "Profile updated",
              message: "Your profile has been updated",
            })
            close()
          }}
        >
          <Flex direction="column" gap={15}>
            <TextInput
              w="100%"
              required
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
              radius="md"
            />
            <TextInput
              w="100%"
              required
              label="Username"
              placeholder="Username"
              {...form.getInputProps("Username")}
              radius="md"
            />
            <Textarea
              w="100%"
              required
              label="Bio"
              placeholder="Bio"
              {...form.getInputProps("bio")}
              radius="md"
            />
            <Button disabled={!form.isValid()} loading={isLoading} type="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      </Modal>

      <Button>Open modal</Button>
      <Layout>
        <Stack>
          {isOwner && <Button onClick={open}>Edit your profile</Button>}
          <Text>hello {user.name}</Text>
          <Text>{user.bio}</Text>
        </Stack>
      </Layout>
    </>
  )
}

export default ProfilePage
