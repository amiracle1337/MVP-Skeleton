import { Button, TextInput, Textarea, Flex } from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"
import { UpdateProfileInputType } from "src/features/users/schemas"
import React from "react"
import { UploadButton } from "src/core/components/UploadThing"
import { notifications } from "@mantine/notifications"

export const EditProfileForm: React.FC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => void
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
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
        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Submit
        </Button>
      </Flex>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res)
          notifications.show({
            color: "green",
            title: "Success!",
            message: "File uploaded!",
          })
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.error("Error uploading file: ", error)
          notifications.show({
            color: "red",
            title: "Error!",
            message: "Failed to upload file. Please try again.",
          })
        }}
      />
    </Form>
  )
}
