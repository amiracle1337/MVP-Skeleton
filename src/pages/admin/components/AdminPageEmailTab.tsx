import { useMutation } from "@blitzjs/rpc"
import { Stack, Select, Group } from "@mantine/core"
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail"
import { EmailList, EmailTemplate } from "src/features/email/types"
import { Button } from "@mantine/core"
import { useState } from "react"
import { EmailTemplates } from "src/features/email/templates"

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
  const [list, setList] = useState<EmailList>(EmailList.Marketing)
  const [template, settemplate] = useState<EmailTemplate>(EmailTemplate.Promotion)
  const [test] = useMutation(sendBulkEmail)

  const foundTemplate = EmailTemplates.find((t) => t.value === template)

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw", gap: "20px" }}>
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
          value={template}
          onChange={(value) => {
            settemplate(value as EmailTemplate)
          }}
        />
        <Button
          onClick={async () => {
            await test({ template, list })
          }}
        >
          Send bulk email
        </Button>
      </Stack>
      {/* @ts-ignore */}
      {foundTemplate && <foundTemplate.component />}
    </div>
  )
}
