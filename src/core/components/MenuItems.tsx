import { IconPencil, IconTrash } from "@tabler/icons-react"
import { Menu, Text, Group } from "@mantine/core"
import { useRouter } from "next/router"
import { confirmDelete } from "src/utils/mantine-utils"
import NextLink from "next/link"
import { HelpTooltipCircle } from "./HelpToolCircle"

let ITEM_FONT_SIZE = 13.3
let ICON_SIZE = 14

export const MenuItemLink = ({ Icon, href, children, ...rest }) => {
  return (
    <Menu.Item
      style={{
        fontSize: ITEM_FONT_SIZE,
        display: "flex",
        alignItems: "center",
      }}
      component={NextLink}
      href={href}
      {...rest}
    >
      {Icon && (
        <Icon size={ICON_SIZE} stroke={2} style={{ verticalAlign: "middle", lineHeight: "1.2" }} />
      )}{" "}
      {/* Adjust line-height for the icon */}
      <span style={{ marginLeft: "0.3rem", verticalAlign: "middle", lineHeight: "1.2" }}>
        {children}
      </span>{" "}
      {/* Adjust line-height for the text */}
    </Menu.Item>
  )
}

export const MenuItemEdit = ({ href, children = "Edit" }) => {
  return (
    <MenuItemLink Icon={IconPencil} href={href}>
      {children}
    </MenuItemLink>
  )
}

export const MenuItemDelete: React.FC<{
  onClick: any
  confirm?: boolean
  redirect?: any
}> = ({ onClick, redirect, confirm = true }) => {
  const { push } = useRouter()

  let del = async () => {
    await onClick()
    if (redirect) {
      await push?.(redirect)
    }
  }

  return (
    <MenuItemIcon
      Icon={IconTrash}
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (confirm) {
          try {
            await confirmDelete(del)
          } catch (error) {
            console.error("An error occurred:", error)
          }
        } else {
          try {
            await del()
          } catch (error) {
            console.error("An error occurred:", error)
          }
        }
      }}
      style={(t) => ({
        color: t.colors.red[3],
        fontSize: ITEM_FONT_SIZE,
      })}
    >
      Delete
    </MenuItemIcon>
  )
}

export const MenuItemIcon = ({ Icon, children, tooltip = "", ...rest }) => {
  const childrenWithTooltip = tooltip ? (
    <Group style={{ width: "100%" }}>
      <Text style={{ lineHeight: "1.2" }}>{children}</Text>
      <HelpTooltipCircle tooltip={tooltip} />
    </Group>
  ) : (
    children
  )

  return (
    <Menu.Item
      style={{
        fontSize: ITEM_FONT_SIZE,
        display: "flex",
        alignItems: "center",
      }}
      {...rest}
    >
      {Icon && (
        <Icon size={ICON_SIZE} stroke={2} style={{ verticalAlign: "middle", lineHeight: "1.2" }} />
      )}{" "}
      {/* Adjust line-height for the icon */}
      <span style={{ marginLeft: "0.3rem", verticalAlign: "middle", lineHeight: "1.2" }}>
        {childrenWithTooltip}
      </span>{" "}
      {/* Adjust line-height for the text */}
    </Menu.Item>
  )
}
