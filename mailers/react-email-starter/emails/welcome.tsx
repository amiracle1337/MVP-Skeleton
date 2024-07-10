import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components"
import * as React from "react"
import { APP_NAME } from "src/config"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { emailStyles } from "../styles"
import { MainButton } from "../components/MainButton"

const defaultProps = {
  name: "test",
  emailVerifyURL: "https://example.com",
}

export const EmailTemplateWelcome: React.FC<{
  props: {
    name?: string | null
    emailVerifyURL: string | null
  }
}> = ({ props = defaultProps }) => {
  const { name, emailVerifyURL } = props
  const welcomeMessage = name ? `Hi ${name}` : "Hey there,"

  return (
    <Html>
      <Head />
      <Preview>Welcome to {APP_NAME}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />

            <Text style={emailStyles.paragraph}>
              {welcomeMessage}, Welcome to {APP_NAME}.
            </Text>
            <MainButton href={emailVerifyURL || "https://artifo.co"}>
              Click here to verify your account!
            </MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateWelcome
