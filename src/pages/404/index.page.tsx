import Head from "next/head"
import { ErrorComponent } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Flex } from "@mantine/core"

export default function Page404() {
  const statusCode = 404
  const title = "This page could not be found"
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <Layout>
        <Flex justify="center" align="center" style={{ height: "100vh", width: "100vw" }}>
          <ErrorComponent statusCode={statusCode} title={title} />
        </Flex>
      </Layout>
    </>
  )
}
