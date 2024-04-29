import { useMutation } from "@blitzjs/rpc"
import { Stack, Select, Button } from "@mantine/core"
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail"
import { EmailList, EmailTemplate } from "src/features/email/types"
import { useState } from "react"
import { EmailTemplates } from "src/features/email/templates"
import { convertArrayToObject } from "src/utils/utils"

type Variable = { key: string; value: string }

const listOptions = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
]

const templateOptions = [
  { value: EmailTemplate.Dummy, label: "Dummy" },
  { value: EmailTemplate.Promotion, label: "Promotion" },
]

const Variables: React.FC<{ variables: Variable[]; addVariable: (variable: Variable) => void }> = ({
  variables,
  addVariable,
}) => {
  return (
    <Stack>
      <Button
        onClick={() => {
          addVariable({ key: "mainButtonText", value: "SHOP NOfffF" })
        }}
      >
        Add variable
      </Button>
      <Stack>
        {variables.map((variable, index) => (
          <div key={index}>
            {variable.key} : {variable.value}
          </div>
        ))}
      </Stack>
    </Stack>
  )
}

export const AdminPageEmailTab = () => {
  const [list, setList] = useState<EmailList>(EmailList.Marketing)
  const [template, setTemplate] = useState<EmailTemplate>(EmailTemplate.Promotion)
  const [variables, setVariables] = useState<Variable[]>([])
  const [test] = useMutation(sendBulkEmail)

  const addVariable = (newVariable: Variable) => {
    setVariables((prevVariables) => [...prevVariables, newVariable])
  }

  const foundTemplate = EmailTemplates.find((t) => t.value === template)
  const componentProps = convertArrayToObject(variables)

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
            setTemplate(value as EmailTemplate)
          }}
        />
        <Button
          onClick={async () => {
            await test({ template, list })
          }}
        >
          Send bulk email
        </Button>
        <Variables variables={variables} addVariable={addVariable} />
      </Stack>
      {/* @ts-ignore */}
      {foundTemplate && <foundTemplate.component props={componentProps} />}
    </div>
  )
}
