import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components"
import * as React from "react"
import { Header } from "../components/Header"
import { MainButton } from "../components/MainButton"
import { Footer } from "../components/Footer"
import { emailStyles } from "../styles"

const defaultProps = {
  resetPasswordUrl: "https://example.com",
}

export const EmailTemplateResetPassword: React.FC<{
  props: {
    resetPasswordUrl: string
  }
}> = ({ props = defaultProps }) => {
  const { resetPasswordUrl } = props
  return (
    <Html>
      <Head />
      <Preview>Reset your Nova password</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />

            <Text style={emailStyles.paragraph}>
              Hey! You requested to reset your password. Click the button below to reset your
              password. If you didn't, please ignore this email.
            </Text>
            <MainButton href={resetPasswordUrl}>Click here to reset your password!</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateResetPassword
