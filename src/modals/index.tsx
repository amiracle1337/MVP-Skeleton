import { BecomeProModalComponent } from "./components/BecomePro"
import { ReportBug } from "./components/ReportBug"

export enum GlobalModals {
  becomePro = "becomePro",
  reportBug = "reportBug",
}

export const globalModals = {
  [GlobalModals.becomePro]: BecomeProModalComponent,
  [GlobalModals.reportBug]: ReportBug,
}

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof globalModals
  }
}
