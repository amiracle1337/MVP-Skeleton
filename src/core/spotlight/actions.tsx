// settingsTabs.ts
import {
  IconUserCog,
  IconMail,
  IconCreditCard,
  IconGift,
  IconMoneybag,
  IconUser,
  IconMoodPlus,
} from "@tabler/icons-react"
import { ChangePassword } from "src/pages/settings/components/ChangePassword"
import { UserEmailSettings } from "src/pages/settings/components/UserEmailSettings"
import { UserBillingSettings } from "src/pages/settings/components/UserBillingSettings"
import { UserInvitesSettings } from "src/pages/settings/components/UserInvitesSettings"
import { AdminPageBillingTab } from "src/pages/admin/components/AdminPageBillingTab"
import { AdminPageUserTab } from "src/pages/admin/components/AdminPageUserTab"
import { AdminPageInviteTab } from "src/pages/admin/components/AdminPageInviteTab"
import { AdminPageEmailTab } from "src/pages/admin/components/AdminPageEmailTab"

export const settingsTab = [
  {
    value: "account",
    label: "Account",
    icon: IconUserCog,
    content: ChangePassword,
  },
  {
    value: "email",
    label: "Email",
    icon: IconMail,
    content: UserEmailSettings,
  },

  {
    value: "billing",
    label: "Billing",
    icon: IconCreditCard,
    content: UserBillingSettings,
  },
  {
    value: "invites",
    label: "Invites",
    icon: IconGift,
    content: UserInvitesSettings,
  },
]

export const adminSettingsTab = [
  {
    value: "billing",
    label: "Billing",
    icon: IconMoneybag,
    content: AdminPageBillingTab,
  },
  {
    value: "users",
    label: "Users",
    icon: IconUser,
    content: AdminPageUserTab,
  },
  {
    value: "invite",
    label: "Invite",
    icon: IconMoodPlus,
    content: AdminPageInviteTab,
  },
  {
    value: "email",
    label: "Email",
    icon: IconUserCog,
    content: AdminPageEmailTab,
  },
]
