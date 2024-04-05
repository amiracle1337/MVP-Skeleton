import { Avatar, AvatarProps } from "@mantine/core"
import { getAvatarFallbackName, getUploadthingUrl } from "src/utils/utils"

type Props = {
  user: {
    name?: string | null
    avatarImageKey?: string | null
  }
} & Partial<AvatarProps>

export const UserAvatar: React.FC<Props> = ({ user, ...rest }) => {
  return (
    <Avatar src={getUploadthingUrl(user.avatarImageKey)} radius="xl" {...rest}>
      {getAvatarFallbackName(user.name)}
    </Avatar>
  )
}
