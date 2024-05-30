import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { Text, Table, Button, CopyButton, Indicator, Title, Badge } from "@mantine/core"
import getInviteGiftCodes from "src/features/invite-gift-codes/queries/getInviteGiftCodes"
import { URL_ORIGIN } from "src/config"

const GiftCodeRow = ({ giftCode }) => {
  const maxRedeems = 5
  const redeemed = giftCode.sentInvites.length
  const url = `${URL_ORIGIN}/gift/${giftCode.id}`

  const isRedeemed = redeemed >= maxRedeems
  const dotColor = isRedeemed ? "red" : "lime"
  const title = isRedeemed ? "Already used" : "New invites"

  return (
    <Table.Tr key={giftCode.id}>
      <Table.Td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge variant="light" color={dotColor}>
            <span style={{ display: "inline-block", height: "20px" }}>{title}</span>
          </Badge>
          <span style={{ marginLeft: "8px" }}>{giftCode.id}</span>
        </div>
      </Table.Td>
      <Table.Td>
        {redeemed}/{maxRedeems}
      </Table.Td>
      <Table.Td>
        <CopyButton value={url}>
          {({ copied, copy }) => (
            <Button size="xs" disabled={isRedeemed || copied} onClick={copy}>
              {copied ? "Copied url" : "Copy url"}
            </Button>
          )}
        </CopyButton>
      </Table.Td>
    </Table.Tr>
  )
}

const UsersTable = ({ giftCodes }) => {
  const sortedInvites = giftCodes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const userRows = sortedInvites.map((giftCode) => (
    <GiftCodeRow key={giftCode.id} giftCode={giftCode} />
  ))

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Code</Table.Th>
          <Table.Th>Redeemed</Table.Th>
          <Table.Th>Copy URL</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{userRows}</Table.Tbody>
    </Table>
  )
}

export const UserInvitesSettings = () => {
  const [giftCodes] = useQuery(getInviteGiftCodes, {})
  const allRedeemed = giftCodes.every((giftCode) => giftCode.sentInvites.length >= 5)

  return (
    <div style={{ width: "100%" }}>
      <Title order={3} style={{ paddingTop: "10px", paddingBottom: "15px" }} w={500}>
        Giftcode invites
      </Title>

      <UsersTable giftCodes={giftCodes} />
    </div>
  )
}
