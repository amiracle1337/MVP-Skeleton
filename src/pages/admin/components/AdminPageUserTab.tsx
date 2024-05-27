import { useQuery, useMutation } from "@blitzjs/rpc"
import { Text, Table, Button } from "@mantine/core"
import impersonateUser from "src/features/admin/mutations/impersonateUser"
import getAllUsers from "src/features/admin/queries/getAllUsers"
import { useRouter } from "next/router"

const UserRow = ({ user }) => {
  const [$impersonateUser, { isLoading }] = useMutation(impersonateUser, {})
  const router = useRouter()

  return (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <Button
          loading={isLoading}
          onClick={async () => {
            await $impersonateUser({ userId: user.id })
            await router.push("/")
          }}
          size="xs"
        >
          Impersonate
        </Button>
      </Table.Td>
    </Table.Tr>
  )
}

export const AdminPageUserTab = () => {
  const [users] = useQuery(getAllUsers, {})
  const [$impersonateUser, { isLoading }] = useMutation(impersonateUser, {})

  const userRows = users.map((user) => <UserRow key={user.id} user={user} />)

  return (
    <div style={{ width: "100%" }}>
      <Text style={{ paddingTop: "10px", marginTop: "20px" }} size="xl" w={500}>
        Users
      </Text>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Subscriptions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{userRows}</Table.Tbody>
      </Table>
    </div>
  )
}
