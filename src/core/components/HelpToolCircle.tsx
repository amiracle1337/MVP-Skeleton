import { IconHelpCircle } from "@tabler/icons-react"
import { Tooltip } from "@mantine/core"

export const HelpTooltipCircle = ({ tooltip }) => (
  <Tooltip bg="gray.9" style={{ boxShadow: "lg", color: "black" }} label={tooltip}>
    <IconHelpCircle size={18}>{tooltip}</IconHelpCircle>
  </Tooltip>
)
