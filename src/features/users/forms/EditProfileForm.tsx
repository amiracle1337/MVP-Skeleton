import {
  Button,
  TextInput,
  Textarea,
  Flex,
  FileInput,
  Text,
  Group,
  Loader,
  Image,
  Stack,
  Indicator,
  ActionIcon,
  Tooltip,
} from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"
import { UpdateProfileInputType } from "src/features/users/schemas"
import React, { useState } from "react"
import { notifications } from "@mantine/notifications"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { useUploadThing } from "src/core/components/UploadThing"
import { getUploadthingUrl } from "src/utils/utils"

export const EditProfileForm: React.FC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => void
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
  const [isLoading, setIsLoading] = useState(false) // Manage loading state with useState

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      setIsLoading(false)
      const fileKey = files?.[0]?.key
      fileKey && form.setFieldValue("avatarImageKey", fileKey)
    },
    onUploadError: () => {
      setIsLoading(false)
      notifications.show({
        title: "Upload failed",
        message: "Your file could not be uploaded",
        color: "red",
      })
    },
  })

  const existingFileKey = form.values.avatarImageKey

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap={15}>
        <TextInput
          w="100%"
          required
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          radius="md"
        />
        <TextInput
          w="100%"
          required
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <Textarea
          w="100%"
          required
          label="Bio"
          placeholder="Bio"
          {...form.getInputProps("bio")}
          radius="md"
        />
      </Flex>

      <Stack>
        <Group mt={10}>
          <Text size="sm" w={500}>
            Profile picture
          </Text>
          {isLoading && <Loader size="xs" />}
        </Group>

        {existingFileKey && (
          <Stack w={"90px"}>
            <Indicator
              color={"none"}
              label={
                <Tooltip label="Remove">
                  <ActionIcon
                    onClick={() => {
                      form.setFieldValue("avatarImageKey", "")
                    }}
                    size="xs"
                    variant="light"
                    color="gray"
                  >
                    <IconX size={12} />
                  </ActionIcon>
                </Tooltip>
              }
            >
              <Image w={"80px"} src={getUploadthingUrl(existingFileKey)} />
            </Indicator>
          </Stack>
        )}
        {!existingFileKey && (
          <FileInput
            style={{ width: "35%" }}
            placeholder="Profile picture"
            leftSection={<IconPhoto size={20} />}
            clearable={true}
            disabled={isLoading} // Use the isLoading state for the disabled prop
            onChange={(files) => {
              setIsLoading(true) // Enable loading state when a file is selected
              if (files) {
                startUpload([files]) // Adjust this as needed to match the expected format
              }
            }}
          />
        )}
      </Stack>
      <Button mt={15} disabled={!form.isValid()} loading={isSubmitting} type="submit">
        Submit
      </Button>
    </Form>
  )
}
