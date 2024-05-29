import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components"
import * as React from "react"
import { APP_NAME, URL_ORIGIN } from "src/config"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { emailStyles } from "../styles"
import { MainButton } from "../components/MainButton"

export const EmailTemplateInviteAccepted: React.FC<{
  props: {}
}> = ({}) => {
  const signupUrl = `${URL_ORIGIN}/signup`
  return (
    <Html>
      <Head />
      <Preview>Your invite has been accepted </Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>
              Welcome to {APP_NAME}! Your invite has been accepted.
            </Text>
            <MainButton href={signupUrl}>Click here to sign up!</MainButton>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplateInviteAccepted
