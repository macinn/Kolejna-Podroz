import { createTheme } from "@mui/material/styles";
import backgroundImage from '../../media/trainBlur.jpg';

const AdminTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#90caf9",
      secondary: {
        main: "#f48fb1",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e"
      },
      text: {
        primary: "#ffffff",
        secondary: "#bdbdbd",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  },
});
export default AdminTheme;
