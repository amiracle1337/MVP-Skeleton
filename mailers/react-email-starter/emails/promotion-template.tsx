import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components"
import * as React from "react"
import { APP_NAME } from "src/config"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { emailStyles } from "../styles"
import { MainButton } from "../components/MainButton"
import { title } from "process"

const defaultProps = {
  name: "test",
  emailVerifyURL: "https://example.com",
  unsubscribeLink: "",
  title: "Black Friday Savings",
  mainButtonText: "Shop Now",
}

export const EmailTemplatePromotion: React.FC<{
  props: {
    name?: string | null
    emailVerifyURL: string | null
    unsubscribeLink: string
    title?: string
    mainButtonText: string
  }
}> = ({ props = defaultProps }) => {
  const { name, unsubscribeLink, title, mainButtonText } = props

  return (
    <Html>
      <Head />
      <Preview>Welcome to {APP_NAME}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.box}>
            <Header />
            <Text style={emailStyles.paragraph}>{title}</Text>
            <MainButton href="https://dashboard.stripe.com/login">{mainButtonText}</MainButton>
            <Footer unsubscribeLink={unsubscribeLink} />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplatePromotion
