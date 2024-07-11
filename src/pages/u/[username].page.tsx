import { invoke } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { Text, Stack, Button, Flex, Title } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { EditProfilePageModal } from "./EditProfilePageModal"

// Define the type for the props
type ProfilePageProps = {
  user?: {
    id: string
    username: string
    bio: string
    name: string
  }
  userNotFound: boolean
}

export const ProfilePage: BlitzPage<ProfilePageProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const currentUser = useCurrentUser()
  const isOwner = currentUser?.id === props.user?.id

  if (props.userNotFound) {
    return (
      <Layout>
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{ height: "80vh", width: "100vw", textAlign: "center" }}
        >
          <Title size="xl" w={500} mt="md">
            Oops! User not found
          </Title>
          <Text size="md" color="dimmed" mt="sm">
            Maybe you typed in the wrong user
          </Text>
        </Flex>
      </Layout>
    )
  }

  return (
    <>
      <Layout>
        <EditProfilePageModal user={props.user} opened={opened} close={close} />
        <Stack>
          {isOwner && <Button onClick={open}>Edit your profile</Button>}
          {props.user && (
            <>
              <Text>hello {props.user.username}</Text>
              <Text>{props.user.bio}</Text>
            </>
          )}
        </Stack>
      </Layout>
    </>
  )
}

// the information the ssr function will pass to the page
// is private and will not be exposed to the client unless you
// explicitly pass it to the page's props
// invoke is used for server-side RPC calls
// getquery is used for client-side RPC calls
export async function getServerSideProps(context) {
  const username = context.query.username as string

  try {
    const user = await invoke(getUserForProfile, { username })

    // Check if user is found
    if (!user) {
      return {
        props: {
          userNotFound: true,
        },
      }
    }

    // The object returned by getServerSideProps
    // is what gets passed to the page component as its props.
    return {
      props: {
        user,
        userNotFound: false,
      },
    }
  } catch (error) {
    return {
      props: {
        userNotFound: true,
      },
    }
  }
}

export default ProfilePage
