import Head from "next/head"
import { ErrorComponent, Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Flex, Text, Button, Title } from "@mantine/core"
import { useRouter } from "next/router"

export default function Page404() {
  const router = useRouter()

  return (
    <>
      <Layout>
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{ height: "70vh", width: "100vw", textAlign: "center" }}
        >
          <Title size="xl" mt="md">
            Oops! The page you are looking for does not exist.
          </Title>
          <Text size="md" color="dimmed" mt="sm">
            It might have been moved or deleted.
          </Text>
          <Button mt="lg" onClick={() => router.push(Routes.Home())} variant="light">
            Go to Homepage
          </Button>
        </Flex>
      </Layout>
    </>
  )
}
