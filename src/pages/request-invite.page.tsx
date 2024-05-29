import Layout from "src/core/layouts/Layout"
import { useMutation } from "@blitzjs/rpc"
import createSignupInvite from "src/features/signup-invites/mutations/createSignupInvite"
import { useState } from "react"
import { Paper, Button, Input, Flex, Text } from "@mantine/core"
import { BlitzPage } from "@blitzjs/auth"

export const RequestInvitePage: BlitzPage = () => {
  const [email, setEmail] = useState("")
  const [$requestInvite, { isLoading, isSuccess }] = useMutation(createSignupInvite, {})

  const handleRequestInvite = async () => {
    try {
      await $requestInvite({ email })
      setEmail("") // Clear the input field after successful request
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout title="Request invite">
      <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
        <Paper style={{ width: "100%", maxWidth: "350px" }} radius="md" p="xl" withBorder>
          {!isSuccess && (
            <>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Flex justify="center" mt="20px">
                <Button
                  variant="light"
                  radius="md"
                  fullWidth
                  color="green"
                  disabled={!email}
                  loading={isLoading}
                  onClick={handleRequestInvite}
                >
                  Request invite
                </Button>
              </Flex>
            </>
          )}
          {isSuccess && (
            <Text>Success, you will receive an email when your invite is accepted.</Text>
          )}
        </Paper>
      </Flex>
    </Layout>
  )
}

export default RequestInvitePage
