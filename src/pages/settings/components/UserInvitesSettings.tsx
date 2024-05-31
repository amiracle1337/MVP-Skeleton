import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { Text, Table, Button, CopyButton, Badge, Title } from "@mantine/core"
import getInviteGiftCodes from "src/features/invite-gift-codes/queries/getInviteGiftCodes"
import { URL_ORIGIN } from "src/config"
import { IconCopy, IconStarFilled } from "@tabler/icons-react"

const InviteGiftCodeRow = ({ giftCode }) => {
  const maxRedeems = 5
  const redeemedCount = giftCode.sentInvites.length
  const giftCodeUrl = `${URL_ORIGIN}/gift/${giftCode.id}`

  const isRedeemed = redeemedCount >= maxRedeems
  const dotColor = isRedeemed ? "rgba(161, 161, 161, 1)" : "green"
  const title = isRedeemed ? "Already used" : "New invites"

  return (
    <Table.Tr key={giftCode.id}>
      <Table.Td>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge
            leftSection={!isRedeemed && <IconStarFilled size={"10px"} />}
            variant="light"
            color={dotColor}
          >
            <span style={{ display: "inline-block", height: "20px" }}>{title}</span>
          </Badge>
          <span style={{ marginLeft: "8px" }}>{giftCode.id}</span>
        </div>
      </Table.Td>
      <Table.Td>
        {redeemedCount}/{maxRedeems}
      </Table.Td>
      <Table.Td>
        <CopyButton value={giftCodeUrl}>
          {({ copied, copy }) => (
            <Button
              leftSection={<IconCopy size={15} />}
              size="xs"
              disabled={isRedeemed || copied}
              onClick={copy}
            >
              {copied ? "Copied URL" : "Copy URL"}
            </Button>
          )}
        </CopyButton>
      </Table.Td>
    </Table.Tr>
  )
}

const InviteGiftCodesTable = ({ giftCodes }) => {
  const sortedGiftCodes = giftCodes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const giftCodeRows = sortedGiftCodes.map((giftCode) => (
    <InviteGiftCodeRow key={giftCode.id} giftCode={giftCode} />
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
      <Table.Tbody>{giftCodeRows}</Table.Tbody>
    </Table>
  )
}

export const UserInvitesSettings = () => {
  const [giftCodes] = useQuery(getInviteGiftCodes, {})

  return (
    <div style={{ width: "100%" }}>
      <Title order={3} style={{ paddingTop: "10px", paddingBottom: "15px" }}>
        Gift Code Invites
      </Title>

      <InviteGiftCodesTable giftCodes={giftCodes} />
    </div>
  )
}
