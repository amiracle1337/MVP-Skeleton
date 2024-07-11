import { Stack } from "@mantine/core"

export const index = () => {
  return (
    <Stack>
      <h1>index</h1>
      <p>The base name of the file being edited, that is, the file name without its extensions.</p>
    </Stack>
  )
}
const { isMobile } = useMediaQueries()

{
  !isMobile && <Text c="gray.7">{user.username}</Text>
}
