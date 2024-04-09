import { ContextModalProps } from "@mantine/modals"
import { Button, Group } from "@mantine/core"
type InnerProps = {}

export const ReportBug: React.FC<ContextModalProps<InnerProps>> = ({ context, id, innerProps }) => {
  const {} = innerProps

  const handleCloseModal = () => context.closeModal(id)

  return (
    <Group style={{ width: "100%" }}>
      <div style={{ marginBottom: 15 }}>report bug pro</div>
      <Group justify="space-between">
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("submit")
          }}
        >
          Submit
        </Button>
      </Group>
    </Group>
  )
}
