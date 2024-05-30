import React, { useState } from "react"
import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getInviteGiftCode from "src/features/invite-gift-codes/queries/getInviteGiftCode"
import { Paper, Stack, Button, Input, Flex, Text } from "@mantine/core"
import redeemGiftCode from "src/features/invite-gift-codes/mutations/redeemGiftCode"

const GiftCodePage: BlitzPage = () => {
  const id = useStringParam("id")
  const [giftCode] = useQuery(getInviteGiftCode, { id: id as string })
  const [$redeemGiftCode, { isLoading, isSuccess }] = useMutation(redeemGiftCode, {})
  const [email, setEmail] = useState("")

  const handleRequestInvite = async () => {
    try {
      await $redeemGiftCode({
        email: email,
        code: giftCode.id,
      })
      setEmail("") // Clear the input field after successful request
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout title="Gift Code">
      <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
        <Paper style={{ width: "100%", maxWidth: "350px" }} radius="md" p="xl" withBorder>
          {giftCode.redeemed ? (
            <Text>Unfortunately this gift code has already been redeemed.</Text>
          ) : (
            <>
              {!isSuccess && (
                <>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email..."
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
                <Text mt="20px">Success, please check your email for your invite!</Text>
              )}
            </>
          )}
        </Paper>
      </Flex>
    </Layout>
  )
}

export default GiftCodePage
