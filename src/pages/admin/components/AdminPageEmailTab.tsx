import { useMutation } from "@blitzjs/rpc"
import { Stack, Select } from "@mantine/core"
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail"
import { EmailList } from "src/features/email/types"
import { Button } from "@mantine/core"
import { useState } from "react"

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
]

export const AdminPageEmailTab = () => {
  const [test] = useMutation(sendBulkEmail)
  const [list, setList] = useState<EmailList>(EmailList.Marketing)
  return (
    <Stack>
      <Select
        label="Choose email list"
        placeholder="Pick value"
        data={options}
        value={list}
        onChange={(value) => {
          setList(value as EmailList)
        }}
      />
      chosen list: {list}
      <Button
        onClick={async () => {
          await test({ list })
        }}
      >
        Send bulk email
      </Button>
    </Stack>
  )
}
