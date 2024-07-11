import { invoke, useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { Text, Stack, Button } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { EditProfilePageModal } from "./EditProfilePageModal"
import { UserNotVerifiedWarning } from "src/core/components/UserNotVerifiedWarning"
import { isContext } from "vm"

// Define the type for the props
type ProfilePageProps = {
  user: {
    username: string
    bio: string
    isOwner: boolean
    id: string
    name: string
  }
}

export const ProfilePage: BlitzPage<ProfilePageProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const currentUser = useCurrentUser()
  const isOwner = currentUser?.id === props.user?.id

  const { username, bio, name } = props.user

  return (
    <>
      <Button onClick={open}>Open modal</Button>
      <Layout>
        <EditProfilePageModal user={props.user} opened={opened} close={close} />
        <Stack>
          {/* {isOwner && !currentUser.emailVerifiedAt && <UserNotVerifiedWarning />} */}
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
  const username = context.query.username
  const user = await invoke(getUserForProfile, { username: username })

  console.log("ahlaaa", user)

  // Pass data to the page via props
  return {
    props: {
      user: {
        ...user,
      },
    },
  }
}

export default ProfilePage
