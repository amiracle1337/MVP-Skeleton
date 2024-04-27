import EmailTemplatePromotion from "mailers/react-email-starter/emails/promotion-template"
import { EmailTemplate } from "./types"
import EmailTemplateDummy from "mailers/react-email-starter/emails/dummy"

export const EmailTemplates = [
  {
    name: "Promotion",
    value: EmailTemplate.Promotion,
    component: EmailTemplatePromotion,
  },
  {
    name: "Dummy",
    value: EmailTemplate.Dummy,
    component: EmailTemplateDummy,
  },
]
