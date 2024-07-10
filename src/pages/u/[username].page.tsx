import { useQuery } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { Text, Stack, Button } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { EditProfilePageModal } from "./EditProfilePageModal"
import { UserNotVerifiedWarning } from "src/core/components/userNotVerifiedWarning"

export const ProfilePage: BlitzPage = (props) => {
  const [opened, { open, close }] = useDisclosure(false)

  const currentUser = useCurrentUser()
  const username = useStringParam("username")
  const [user] = useQuery(getUserForProfile, { username: username || "" }, { enabled: !!username })

  if (!user) return <Text>User not found :(</Text>
  const isOwner = currentUser?.id === user.id

  return (
    <>
      <Button onClick={open}>Open modal</Button>
      <Layout>
        <EditProfilePageModal user={user} opened={opened} close={close} />
        <Stack>
          {isOwner && !currentUser.emailVerifiedAt && <UserNotVerifiedWarning />}
          {isOwner && <Button onClick={open}>Edit your profile</Button>}
          <Text>hello {props.data.username}</Text>
          <Text>{props.data.bio}</Text>
        </Stack>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API

  const data = {
    username: "test",
    bio: "test bio",
  }

  // Pass data to the page via props
  return { props: { data } }
}
export default ProfilePage
