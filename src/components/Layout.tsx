import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  drawerwidth: number;
}>(({ theme, open, drawerwidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0, // Initially no margin
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerwidth}px`,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerWidth = 10; // Adjusted to a more standard drawer width

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Layout: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleDrawerOpen = () => {
    setOpen(!open); // Toggle open state
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <Sidebar
          open={open}
          handleDrawerClose={handleDrawerClose}
          // You might want to pass isDarkMode to Sidebar if it also needs to adapt its style
        />
        <Main open={open} drawerwidth={drawerWidth}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
