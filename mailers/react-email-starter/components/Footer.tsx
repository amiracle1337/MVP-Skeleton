import { Hr, Text } from "@react-email/components"
import { APP_NAME } from "src/config"
import { emailStyles } from "../styles"

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
}

export const Footer = () => (
  <>
    <Text style={emailStyles.paragraph}>— The {APP_NAME} team</Text>
    <Hr style={emailStyles.hr} />
    <Text style={footer}>Stockholm, Sweden</Text>
  </>
)
