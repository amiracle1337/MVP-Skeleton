import { useMutation } from "@blitzjs/rpc"
import { Stack, Select } from "@mantine/core"
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail"
import { EmailList, EmailTemplate } from "src/features/email/types"
import { Button } from "@mantine/core"
import { useState } from "react"

const listOptions = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
]

const templateOptions = [
  { value: EmailTemplate.Dummy, label: "Dummy" },
  { value: EmailTemplate.Promotion, label: "Promotion" },
]

export const AdminPageEmailTab = () => {
  const [test] = useMutation(sendBulkEmail)
  const [list, setList] = useState<EmailList>(EmailList.Marketing)
  const [templateList, setTemplateList] = useState<EmailTemplate>(EmailTemplate.Promotion)
  return (
    <Stack>
      <Select
        label="Choose email list"
        placeholder="Pick value"
        data={listOptions}
        value={list}
        onChange={(value) => {
          setList(value as EmailList)
        }}
      />
      <Select
        label="Choose email template"
        placeholder="Pick one"
        data={templateOptions}
        value={templateList}
        onChange={(value) => {
          setTemplateList(value as EmailTemplate)
        }}
      />
      <Button
        onClick={async () => {
          await test({ template: templateList, list })
        }}
      >
        Send bulk email
      </Button>
    </Stack>
  )
}
