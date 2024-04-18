import { BlitzPage } from "@blitzjs/auth"
import { Text, Stack } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringQueryParam } from "src/utils/utils"

export const unsubscribePage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  return (
    <Layout>
      <Stack>
        <Text>hello {token}</Text>
      </Stack>
    </Layout>
  )
}

export default unsubscribePage
