import React from "react";
import {
  styled,
  type Theme,
  type CSSObject,
  useTheme,
} from "@mui/material/styles"; // Added useTheme
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
import MoneyOffCsredRounded from "@mui/icons-material/MoneyOffCsredRounded";

import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import logo from "/m-logo.png";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // Changed to space-between to accommodate logo
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SidebarProps {
  open: boolean;
}

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navigationItems: NavigationItem[] = [
  {
    path: "/dashboard",
    label: "Home",
    icon: HomeIcon,
  },
  // {
  //   path: "/analytics",
  //   label: "Analytics",
  //   icon: AnalyticsIcon,
  // },
  {
    path: "/orders",
    label: "Orders",
    icon: MoneyOffCsredRounded,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const theme = useTheme();

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        {open && (
          <img
            src={logo}
            alt="Logo"
            style={{
              height: 50,
              marginRight: "auto",
              marginLeft: theme.spacing(1),
            }}
          />
        )}
        {/* <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton> */}
      </DrawerHeader>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
