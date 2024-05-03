import { useMutation } from "@blitzjs/rpc"
import { Stack, Select, Button, Group, Input, ActionIcon, Textarea, Tooltip } from "@mantine/core"
import sendBulkEmail from "src/features/email/mutations/sendBulkEmail"
import { EmailList, EmailTemplate } from "src/features/email/types"
import { useState } from "react"
import { EmailTemplates } from "src/features/email/templates"
import { convertArrayToObject } from "src/utils/utils"
import { IconPencil, IconTextResize, IconTrash } from "@tabler/icons-react"

const listOptions = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
]

const templateOptions = [
  { value: EmailTemplate.Dummy, label: "Dummy" },
  { value: EmailTemplate.Promotion, label: "Promotion" },
]

type VariableType = {
  key: string
  value: string
  id: string
  isTextArea?: boolean
}
type updateVariableType = (id: string, key: string, value: string) => void
type removeVariableType = (id: string) => void
type addVariableType = (variable: VariableType) => void

const VariableInput: React.FC<{
  variable: VariableType
  updateVariable: updateVariableType
  removeVariable: removeVariableType
}> = ({ variable, updateVariable, removeVariable }) => {
  const WritingElement = variable.isTextArea ? Textarea : Input

  const toggleTextArea = () => {
    updateVariable(variable.id, "isTextArea", String(!variable.isTextArea))
  }
  const writingElementProps = {
    placeholder: "Value",
    value: variable.value,
    onChange: (e) => updateVariable(variable.id, variable.key, e.currentTarget.value),
  }
  return (
    <Group>
      <ActionIcon color="red" variant="light" onClick={() => removeVariable(variable.id)}>
        <IconTrash size={13} />
      </ActionIcon>
      <Tooltip
        label={variable.isTextArea ? "Switch to input" : "Switch to textarea"}
        position="top"
      >
        <ActionIcon color="red" variant="light" onClick={toggleTextArea}>
          {variable.isTextArea ? <IconTextResize size={13} /> : <IconPencil size={13} />}
        </ActionIcon>
      </Tooltip>
      <Input
        placeholder="key"
        value={variable.key}
        onChange={(event) => updateVariable(variable.id, event.currentTarget.value, variable.value)}
      />
      {variable.isTextArea ? (
        <Textarea minRows={30} w={300} resize="vertical" {...writingElementProps} />
      ) : (
        <Input {...writingElementProps} />
      )}
    </Group>
  )
}

const VariablesManager: React.FC<{
  variables: VariableType[]
  addVariable: addVariableType
  updateVariable: updateVariableType
  removeVariable: removeVariableType
}> = ({ variables, addVariable, updateVariable, removeVariable }) => {
  return (
    <Stack>
      <Button
        onClick={() => {
          addVariable({ id: Math.random().toString(), key: "", value: "" })
        }}
      >
        Add variable
      </Button>

      {variables.map((variable) => (
        <VariableInput
          key={variable.id}
          variable={variable}
          updateVariable={updateVariable}
          removeVariable={removeVariable}
        />
      ))}
    </Stack>
  )
}

export const AdminPageEmailTab = () => {
  const [selectedList, setSelectedList] = useState<EmailList>(EmailList.Marketing)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>(EmailTemplate.Promotion)
  const [variables, setVariables] = useState<VariableType[]>([])
  const [sendEmailMutation] = useMutation(sendBulkEmail)

  const addVariable = (newVariable: VariableType) => {
    setVariables((prevVariables) => [...prevVariables, newVariable])
  }

  const updateVariable: updateVariableType = (id, key, value) => {
    setVariables((prevVariables) =>
      prevVariables.map((variable) => {
        if (variable.id === id) {
          if (key === "isTextArea") {
            return { ...variable, isTextArea: value === "true" }
          } else {
            return { ...variable, key, value }
          }
        }
        return variable
      })
    )
  }

  const removeVariable: removeVariableType = (id) => {
    setVariables((prevVariables) => prevVariables.filter((variable) => variable.id !== id))
  }

  const foundTemplate = EmailTemplates.find((t) => t.value === selectedTemplate)
  const componentProps = convertArrayToObject(variables)

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw", gap: "20px" }}>
      <Stack>
        <Select
          label="Choose email list"
          placeholder="Pick value"
          data={listOptions}
          value={selectedList}
          onChange={(value) => {
            setSelectedList(value as EmailList)
          }}
        />
        <Select
          label="Choose email template"
          placeholder="Pick one"
          data={templateOptions}
          value={selectedTemplate}
          onChange={(value) => {
            setSelectedTemplate(value as EmailTemplate)
          }}
        />
        <VariablesManager
          variables={variables}
          addVariable={addVariable}
          updateVariable={updateVariable}
          removeVariable={removeVariable}
        />
        <Button
          onClick={async () => {
            await sendEmailMutation({ template: selectedTemplate, list: selectedList })
          }}
        >
          Send bulk email
        </Button>
      </Stack>
      {/* @ts-ignore */}
      {foundTemplate && <foundTemplate.component props={componentProps} />}
    </div>
  )
}
