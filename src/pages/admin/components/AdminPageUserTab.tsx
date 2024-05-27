import { useQuery, useMutation } from "@blitzjs/rpc"
import { Text, Table, Button, Pagination } from "@mantine/core"
import impersonateUser from "src/features/admin/mutations/impersonateUser"
import getAllUsers from "src/features/admin/queries/getAllUsers"
import { useRouter } from "next/router"
import getUserCount from "src/features/admin/queries/getUserCount"
import { usePagination } from "@mantine/hooks"

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
  const usersPerPage = 10
  const [userCount] = useQuery(getUserCount, {})
  const totalPages = Math.ceil(userCount / usersPerPage)
  const pagination = usePagination({ total: totalPages, initialPage: 1 })
  const [users] = useQuery(getAllUsers, { usersPerPage, activePage: pagination.active })

  const userRows = users.map((user) => <UserRow key={user.id} user={user} />)

  return (
    <div style={{ width: "100%" }}>
      <Text style={{ paddingTop: "10px", marginTop: "20 px" }} size="xl" w={500}>
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
      <Pagination
        onChange={(page) => pagination.setPage(page)}
        value={pagination.active}
        style={{ marginTop: "20px" }}
        total={totalPages}
        size="md"
        radius="md"
      />
    </div>
  )
}
