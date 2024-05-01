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

import React, { useState } from "react"
import { notifications } from "@mantine/notifications"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { useUploadThing } from "src/core/components/UploadThing"
import { getUploadthingUrl } from "src/utils/utils"
import { UseFormReturnType } from "@mantine/form"

export const UploadThingFileInput: React.FC<{
  form: UseFormReturnType<any>
  name: string
  label: string
}> = ({ form, name, label }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      setIsLoading(false)
      const fileKey = files?.[0]?.key
      fileKey && form.setFieldValue(name, fileKey)
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

  const existingImageKey = form.values[name]
  return (
    <Stack>
      <Group mt={10}>
        <Text size="sm" w={500}>
          {label}
        </Text>
        {isLoading && <Loader size="xs" />}
      </Group>

      {existingImageKey && (
        <Stack w={"90px"}>
          <Indicator
            color={"none"}
            label={
              <Tooltip label="Remove">
                <ActionIcon
                  onClick={() => {
                    form.setFieldValue(name, "")
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
            <Image
              w={"80px"}
              src={getUploadthingUrl(existingImageKey)}
              alt="Uploaded image" // Ensure alt attribute is set
            />
          </Indicator>
        </Stack>
      )}
      {!existingImageKey && (
        <FileInput
          style={{ width: "35%" }}
          placeholder={label}
          leftSection={<IconPhoto size={20} />}
          clearable={true}
          disabled={isLoading}
          onChange={async (files) => {
            setIsLoading(true)
            if (files) {
              try {
                await startUpload([files])
              } catch (error) {
                console.error("Upload failed:", error)
                notifications.show({
                  title: "Upload Error",
                  message: "There was an error while uploading the file.",
                  color: "red",
                })
                setIsLoading(false)
              }
            }
          }}
        />
      )}
    </Stack>
  )
}
