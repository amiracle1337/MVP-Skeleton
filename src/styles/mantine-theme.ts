import { createTheme } from "@mantine/core"
import { Loader } from "@mantine/core"
import { ButtonProps } from "@mantine/core"
import "@mantine/spotlight/styles.css"

const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "md",
  variant: "light",
}

export const themeMantine = createTheme({
  cursorType: "pointer",
  primaryColor: "dark",
  primaryShade: 6,

  components: {
    Loader: Loader.extend({
      defaultProps: {
        type: "bars",
      },
    }),
    Button: {
      defaultProps: ButtonDefaultProps,
    },
    /*  Slider: {
      styles: () => {
        return {
          thumb: {
            backgroundColor: "red",
            opacity: 0.5,
          },
        }
      },
    },
    */
  },
})
