import { invoke } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { Text, Stack, Button } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { EditProfilePageModal } from "./EditProfilePageModal"

// Define the type for the props
type ProfilePageProps = {
  user: {
    id: string
    username: string
    bio: string
    name: string
  }
}

export const ProfilePage: BlitzPage<ProfilePageProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const currentUser = useCurrentUser()
  const isOwner = currentUser?.id === props.user.id

  return (
    <>
      <Layout>
        <EditProfilePageModal user={props.user} opened={opened} close={close} />
        <Stack>
          {isOwner && <Button onClick={open}>Edit your profile</Button>}
          <Text>hello {props.user.username}</Text>
          <Text>{props.user.bio}</Text>
        </Stack>
      </Layout>
    </>
  )
}

// the information the ssr function will pass to the page
// is private and will not be exposed to the client unless you
// explicitly pass it to the page's props
export async function getServerSideProps(context) {
  const username = context.query.username as string
  const user = await invoke(getUserForProfile, { username })

  return {
    props: {
      user,
    },
  }
}

export default ProfilePage
