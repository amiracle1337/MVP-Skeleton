import { invoke } from "@blitzjs/rpc"
import { BlitzPage, getSession } from "@blitzjs/auth"
import { Text, Stack, Button, Flex, Title } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useDisclosure } from "@mantine/hooks"
import { EditProfilePageModal } from "./EditProfilePageModal"

// Define the type for the props
type ProfilePageProps = {
  user?: {
    id: string
    username: string
    bio: string
    name: string
    isOwner: boolean
  }
  userNotFound: boolean
}

export const ProfilePage: BlitzPage<ProfilePageProps> = ({ user, userNotFound }) => {
  const [opened, { open, close }] = useDisclosure(false)

  if (userNotFound) {
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
        <EditProfilePageModal user={user} opened={opened} close={close} />
        {/* <Stack>
          {user?.isOwner && <Button onClick={open}>Edit your profile</Button>}
          {user && (
            <>
              <Text>hello {user.username}</Text>
              <Text>{user.bio}</Text>
            </>
          )}
        </Stack> */}
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
  // could also use gssp from blitzjs/auth
  const session = await getSession(context.req, context.res)

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

    // Determine if the current user is the owner
    const isOwner = session.userId === user.id

    // The object returned by getServerSideProps
    // is what gets passed to the page component as its props.
    return {
      props: {
        user: { ...user, isOwner },
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
