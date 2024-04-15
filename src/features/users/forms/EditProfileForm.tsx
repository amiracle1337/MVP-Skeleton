import { Button, TextInput, Textarea, Flex } from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"
import { UpdateProfileInputType } from "src/features/users/schemas"
import React from "react"

import { UploadThingFileInput } from "src/core/components/UploadThingFileInput"

export const EditProfileForm: React.FC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => void
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap={15}>
        <TextInput
          w="65%"
          required
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          radius="md"
        />
        <TextInput
          w="65%"
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <Textarea
          w="65%"
          label="Bio"
          placeholder="Bio"
          {...form.getInputProps("bio")}
          radius="md"
        />
      </Flex>

      <UploadThingFileInput form={form} name="avatarImageKey" label="Profile picture" />

      <Button mt={15} disabled={!form.isValid()} loading={isSubmitting} type="submit">
        Submit
      </Button>
    </Form>
  )
}
