import { Hr, Img } from "@react-email/components"
import { emailStyles } from "../styles"
import { Button } from "@react-email/components"

const button = {
  backgroundColor: "black",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
}

export const MainButton = (props) => (
  <>
    <Button style={button} {...props} />
  </>
)
