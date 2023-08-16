import { createTheme } from "@mui/material";
import color from "./colors";

export const theme = createTheme({
  palette: {
    error: {
      main: color.background[400],
    },
    background: {
      primary: color.background[100],
      secondary: color.background[200],
      third: color.background[300],
      hovered: color.background[400],
    },
    text: {
      primary: color.text[100],
      second: color.text[200],
      active: color.text[600],
    },
  },
  typography: {
    fontFamily: `"Poppins", sans-serif `,
    button: {
      textTransform: "none",
    },
  },
});
