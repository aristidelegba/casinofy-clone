"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactNode, useState } from "react";
import { Avatar, Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";

const drawerWidth = "80%";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const balance = new Intl.NumberFormat("FR", {
    style: "currency",
    currency: "XOF",
  }).format(73150);

  const menus: { render: ReactNode }[] = [
    {
      render: (
        <>
          <div className="flex items-center justify-between">
            <div className="grid">
              <div className="text-blue-500 text-sm">Solde</div>
              <div>{balance}</div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="capitalize"
              size="small"
            >
              {" "}
              Recharger
            </Button>
          </div>
        </>
      ),
    },
    {
      render: (
        <>
          <div className="flex items-center justify-between">
            <div className="grid">
              <div className="text-blue-500 text-sm">Gains</div>
              <div>{balance}</div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="capitalize"
              size="small"
            >
              {" "}
              Retirer
            </Button>
          </div>
        </>
      ),
    },
    {
      render: (
        <>
          <Link
            color="primary"
            className="capitalize"
            onClick={() => {
              handleDrawerToggle();
              router.push("/home");
            }}
          >
            {" "}
            Jouer{" "}
          </Link>
        </>
      ),
    },
    {
      render: (
        <>
          <Link
            color="primary"
            className="capitalize"
            onClick={() => {
              handleDrawerToggle();
              router.push("/methods");
            }}
          >
            {" "}
            Paiements{" "}
          </Link>
        </>
      ),
    },
    {
      render: (
        <>
          <Link
            color="primary"
            className="capitalize"
            onClick={() => {
              handleDrawerToggle();
              router.push("/account/history");
            }}
          >
            Historique{" "}
          </Link>
        </>
      ),
    },
    {
      render: (
        <>
          <Link
            color="primary"
            className="capitalize"
            onClick={() => {
              // handleDrawerToggle();
              // router.push("/account/history");
            }}
          >
            Deconnexion{" "}
          </Link>
        </>
      ),
    },
  ];
  const drawer = (
    <div>
      <Toolbar>
        <div className="flex py-5 gap-5 items-center jus">
          <div className="h-20 w-20 rounded-full bg-blue-500"></div>
          <div className="text-2xl font-bold">Leonce</div>{" "}
        </div>
      </Toolbar>
      <Divider />
      <List>
        {menus.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText>{item.render}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-blue-700 flex items-center justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <div 
          
           className="bg-white px-2 py-1 text-blue-900 font-semibold flex-center">
            {balance}
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
