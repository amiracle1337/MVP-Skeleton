import { useQuery, useMutation } from "@blitzjs/rpc"
import { Text, Table, Button, Pagination, Input, Group } from "@mantine/core"
import { usePagination } from "@mantine/hooks"
import { useState, useCallback } from "react"
import debounce from "lodash/debounce"
import getSignupInvite from "src/features/signup-invites/queries/getSignupInvite"
import { format } from "date-fns"
import getInviteCount from "src/features/signup-invites/queries/getInviteCount"
import updateSignupInvite from "src/features/signup-invites/mutations/updateSignupInvite"

const InviteRows = ({ invite }) => {
  const [$updateSignupInvite, { isLoading }] = useMutation(updateSignupInvite, {})
  let dateFormat = "dd-MM-yyyy HH:mm"

  const updateInvite = async (accepted) => {
    await $updateSignupInvite({ id: invite.id, email: invite.email, accepted: accepted })
  }
  let backgroundColor = ""
  if (invite.accepted === true) {
    backgroundColor = "#d4edda" // light green for accepted
  } else if (invite.accepted === false) {
    backgroundColor = "#f8d7da" // light red for declined
  }
  return (
    <Table.Tr key={invite.id} style={{ backgroundColor }}>
      <Table.Td>{invite.id}</Table.Td>
      <Table.Td>{format(new Date(invite.createdAt), dateFormat)}</Table.Td>
      <Table.Td>{invite.email}</Table.Td>
      <Table.Td>{invite.ipAddresses}</Table.Td>
      <Table.Td>
        {!invite.accepted && (
          <Group>
            <Button
              color="green"
              variant="light"
              loading={isLoading}
              onClick={() => updateInvite(true)}
              size="xs"
            >
              Accept
            </Button>
            <Button
              color="red"
              variant="light"
              loading={isLoading}
              onClick={() => updateInvite(false)}
              size="xs"
            >
              Reject
            </Button>
          </Group>
        )}
      </Table.Td>
    </Table.Tr>
  )
}

const UsersTable = ({ searchValue, usersPerPage, activePage }) => {
  const [users] = useQuery(getSignupInvite, {
    usersPerPage,
    activePage,
    search: searchValue,
  })

  const sortedInvites = users.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const userRows = sortedInvites.map((invite) => <InviteRows key={invite.id} invite={invite} />)

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>IP adress</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{userRows}</Table.Tbody>
    </Table>
  )
}

export const AdminPageInviteTab = () => {
  const usersPerPage = 10
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue)

  const [inviteCount] = useQuery(getInviteCount, {
    search: debouncedSearchValue,
  })
  const totalPages = Math.ceil(inviteCount / usersPerPage)
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
        Invites
      </Text>
      <Input
        value={searchValue}
        onChange={handleSearchChange}
        style={{ maxWidth: "250px" }}
        placeholder="Search invites"
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
