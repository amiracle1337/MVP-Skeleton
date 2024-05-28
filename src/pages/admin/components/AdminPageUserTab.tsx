import { useQuery, useMutation } from "@blitzjs/rpc"
import { Text, Table, Button, Pagination, Input } from "@mantine/core"
import impersonateUser from "src/features/admin/mutations/impersonateUser"
import getAllUsers from "src/features/admin/queries/getAllUsers"
import { useRouter } from "next/router"
import getUserCount from "src/features/admin/queries/getUserCount"
import { usePagination } from "@mantine/hooks"
import { useState, useCallback } from "react"
import debounce from "lodash/debounce"

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

const UsersTable = ({ searchValue, usersPerPage, activePage }) => {
  const [users] = useQuery(getAllUsers, {
    usersPerPage,
    activePage,
    search: searchValue,
  })

  const userRows = users.map((user) => <UserRow key={user.id} user={user} />)

  return (
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
  )
}

export const AdminPageUserTab = () => {
  const usersPerPage = 10
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue)

  const [userCount] = useQuery(getUserCount, {
    search: debouncedSearchValue,
  })
  const totalPages = Math.ceil(userCount / usersPerPage)
  const pagination = usePagination({ total: totalPages, initialPage: 1 })

  // Debounce the search value update
  const debounceSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchValue(value)
    }, 300), // Adjust the debounce delay as needed
    []
  )

  // Update search value and trigger debounce
  const handleSearchChange = (event) => {
    const { value } = event.currentTarget
    setSearchValue(value)
    debounceSearch(value)
  }

  return (
    <div style={{ width: "100%" }}>
      <Text style={{ paddingTop: "10px", marginTop: "20px" }} size="xl" w={500}>
        Users
      </Text>
      <Input
        value={searchValue}
        onChange={handleSearchChange}
        style={{ maxWidth: "250px" }}
        placeholder="Search users"
      />
      <UsersTable
        searchValue={debouncedSearchValue}
        usersPerPage={usersPerPage}
        activePage={pagination.active}
      />
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
