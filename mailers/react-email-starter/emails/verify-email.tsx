import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components"
import * as React from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { MainButton } from "../components/MainButton"
import { emailStyles } from "../styles"

const defaultProps = {
  name: "test",
  emailVerifyURL: "https://example.com",
}

export const EmailTemplateVerifyEmail: React.FC<{
  props: {
    emailVerifyURL: string
  }
}> = ({ props = defaultProps }) => {
  const { emailVerifyURL } = props

  return (
    <Html>
      <Head />
      <Preview>Verify your email at </Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              Hi! You requested an email to verify your account. If you didn't, please ignore this
              email
            </Text>
            <MainButton href={emailVerifyURL}>Click here to verify your account!</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateVerifyEmail
