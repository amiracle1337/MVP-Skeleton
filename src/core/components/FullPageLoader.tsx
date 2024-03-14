import { Flex, Loader } from "@mantine/core"

export const FullPageLoader = () => {
  return (
    <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
      <Loader />
    </Flex>
  )
}
