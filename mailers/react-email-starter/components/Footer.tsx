import { Hr, Text } from "@react-email/components"
import { APP_NAME } from "src/config"
import { emailStyles } from "../styles"
import { Link } from "@react-email/link"

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as any,
}

export const Footer = ({ unsubscribeLink }: { unsubscribeLink?: string }) => (
  <>
    {unsubscribeLink ? (
      <>
        <Hr style={emailStyles.hr} />
        <Text style={footer}>
          <Link href={unsubscribeLink} style={footer}>
            Unsubscribe
          </Link>
        </Text>
      </>
    ) : (
      <Text style={emailStyles.paragraph}>— The {APP_NAME} team</Text>
    )}
  </>
)
